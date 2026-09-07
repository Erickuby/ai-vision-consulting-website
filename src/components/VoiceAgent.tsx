import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, MicOff, PhoneOff, X, Calendar, Phone } from 'lucide-react';
import { trackConversion } from '../lib/leadCapture';

/**
 * Embedded ElevenLabs voice agent.
 *
 * Three things shape this component more than anything else:
 *
 * 1. The site is prerendered. Nothing may touch window during render, and the SDK is only
 *    imported after a click, never at module scope.
 * 2. The hero already ships Three.js and a 6.8 MB background video, so the performance
 *    budget is spent. The SDK is a lazy chunk that most visitors never download.
 * 3. The ElevenLabs plan includes 250 agent minutes a month with usage based billing off,
 *    so when they run out the agent simply stops connecting. That is an outage, not a bill,
 *    and the widget has to degrade into the booking link and phone number rather than
 *    presenting a dead button.
 */

const AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID as string | undefined;

const BOOKING_URL = 'https://cal.com/eric-nwankwo/ai-discovery-call';
const PHONE = '+447341183915';
const PHONE_SPOKEN = '+44 7341 183915';
const EMAIL = 'eric.nwankwo@aivisionconsulting.co.uk';

const NUDGE_DISMISSED_KEY = 'avc-voice-nudge-dismissed';
const CALLS_KEY = 'avc-voice-calls';
const MAX_CALLS_PER_SESSION = 2;
const NUDGE_IDLE_MS = 20_000;
const NUDGE_SCROLL_RATIO = 0.5;

type Status = 'idle' | 'connecting' | 'connected' | 'error';
type Mode = 'speaking' | 'listening';

type Session = {
  endSession: () => Promise<void>;
  setMicMuted?: (muted: boolean) => void;
};

function readCallCount() {
  try {
    return Number(window.sessionStorage.getItem(CALLS_KEY) ?? '0') || 0;
  } catch {
    return 0;
  }
}

function bumpCallCount() {
  try {
    window.sessionStorage.setItem(CALLS_KEY, String(readCallCount() + 1));
  } catch {
    // Private browsing. Losing the cap is better than losing the widget.
  }
}

function nudgeAlreadyDismissed() {
  try {
    return window.localStorage.getItem(NUDGE_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function VoiceAgent() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [nudging, setNudging] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [mode, setMode] = useState<Mode>('listening');
  const [muted, setMuted] = useState(false);
  const [errorText, setErrorText] = useState('');
  const sessionRef = useRef<Session | null>(null);

  useEffect(() => setMounted(true), []);

  // Nudge once per visitor: 20 seconds idle or half the page scrolled, whichever comes
  // first. Never while they are filling in the contact form, because interrupting someone
  // mid enquiry costs more than the conversation is worth.
  useEffect(() => {
    if (!mounted || open || nudgeAlreadyDismissed()) return;

    let done = false;
    const fire = () => {
      if (done) return;
      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
      done = true;
      setNudging(true);
      trackConversion('Voice Agent Nudge', { placement: window.location.pathname });
    };

    const timer = window.setTimeout(fire, NUDGE_IDLE_MS);
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= NUDGE_SCROLL_RATIO) fire();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [mounted, open]);

  const dismissNudge = useCallback(() => {
    setNudging(false);
    try {
      window.localStorage.setItem(NUDGE_DISMISSED_KEY, 'true');
    } catch {
      // Nothing to do. Worst case they get nudged again next visit.
    }
  }, []);

  const endCall = useCallback(async () => {
    try {
      await sessionRef.current?.endSession();
    } catch {
      // Already gone.
    }
    sessionRef.current = null;
    setStatus('idle');
    setMuted(false);
  }, []);

  const startCall = useCallback(async () => {
    if (!AGENT_ID) {
      setErrorText('The assistant is not configured yet.');
      setStatus('error');
      return;
    }
    if (readCallCount() >= MAX_CALLS_PER_SESSION) {
      setErrorText('You have reached the call limit for this visit.');
      setStatus('error');
      return;
    }

    setStatus('connecting');
    setErrorText('');
    trackConversion('Voice Agent Call Started', { placement: window.location.pathname });

    try {
      // Imported here, not at the top of the file, so the SDK is a lazy chunk that only
      // visitors who actually click ever download.
      const { Conversation } = await import('@elevenlabs/client');

      // Asking only now means the browser prompt is clearly tied to their click, which is
      // both better manners and far more likely to be granted.
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const session = await Conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'webrtc',
        dynamicVariables: {
          page_context: document.title || window.location.pathname,
          page_path: window.location.pathname,
        },
        onStatusChange: ({ status: next }) => {
          if (next === 'connected') setStatus('connected');
          if (next === 'disconnected') setStatus('idle');
        },
        onModeChange: ({ mode: next }) => setMode(next === 'speaking' ? 'speaking' : 'listening'),
        onDisconnect: () => {
          sessionRef.current = null;
          setStatus('idle');
        },
        onError: (message: string) => {
          setErrorText(message || 'The call dropped.');
          setStatus('error');
        },
      });

      sessionRef.current = session as unknown as Session;
      bumpCallCount();
      setStatus('connected');
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const denied = /permission|denied|notallowed/i.test(message);
      setErrorText(
        denied
          ? 'I could not access your microphone. Check your browser permissions, or use one of the options below.'
          : 'I could not connect the assistant right now. Please use one of the options below.',
      );
      setStatus('error');
      trackConversion('Voice Agent Call Failed', { reason: denied ? 'mic-denied' : 'connect-failed' });
    }
  }, []);

  const toggleMute = useCallback(() => {
    const next = !muted;
    sessionRef.current?.setMicMuted?.(next);
    setMuted(next);
  }, [muted]);

  useEffect(() => () => void sessionRef.current?.endSession().catch(() => {}), []);

  // Rendering nothing on the server keeps the prerender clean, and an unconfigured agent id
  // means the whole thing stays out of the DOM rather than shipping a broken button.
  if (!mounted || !AGENT_ID) return null;

  const panelOpen = open || status === 'connected' || status === 'connecting' || status === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {nudging && !panelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="relative max-w-[16rem] rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-md"
            style={{ background: 'rgba(10,20,40,0.92)', borderColor: 'rgba(0,212,255,0.25)', color: '#F0F4FF' }}
          >
            <button
              type="button"
              onClick={dismissNudge}
              aria-label="Dismiss"
              className="absolute right-2 top-2 text-white/40 hover:text-white"
            >
              <X size={14} />
            </button>
            <p className="pr-4">Questions about the training? You can talk to our assistant.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            role="dialog"
            aria-label="Voice assistant"
            className="w-[min(20rem,calc(100vw-3rem))] rounded-2xl border p-4 shadow-2xl backdrop-blur-md"
            style={{ background: 'rgba(10,20,40,0.96)', borderColor: 'rgba(0,212,255,0.25)', color: '#F0F4FF' }}
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: 'Space Grotesk' }}>Joe</p>
                <p className="text-xs text-white/50">AI assistant, AI Vision Consulting</p>
              </div>
              <button
                type="button"
                onClick={() => { void endCall(); setOpen(false); }}
                aria-label="Close assistant"
                className="text-white/40 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {status === 'connected' && (
              <p className="mb-3 text-sm text-white/80">
                {mode === 'speaking' ? 'Joe is speaking…' : 'Listening…'}
              </p>
            )}
            {status === 'connecting' && <p className="mb-3 text-sm text-white/80">Connecting…</p>}

            {status === 'error' && (
              <div className="mb-3 space-y-3">
                <p className="text-sm text-white/80">{errorText}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-conversion-placement="Voice agent fallback: booking"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold"
                    style={{ background: '#00D4FF', color: '#050D1A' }}
                  >
                    <Calendar size={15} /> Book a free discovery call
                  </a>
                  <a
                    href={`tel:${PHONE}`}
                    data-conversion-placement="Voice agent fallback: phone"
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: 'rgba(0,212,255,0.25)' }}
                  >
                    <Phone size={15} /> {PHONE_SPOKEN}
                  </a>
                  <a href={`mailto:${EMAIL}`} className="text-xs text-white/50 underline">
                    Or email us
                  </a>
                </div>
              </div>
            )}

            {status === 'idle' && (
              <button
                type="button"
                onClick={() => void startCall()}
                className="mb-3 w-full rounded-lg px-3 py-2 text-sm font-semibold"
                style={{ background: '#00D4FF', color: '#050D1A' }}
              >
                Start talking
              </button>
            )}

            {status === 'connected' && (
              <div className="mb-3 flex gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: 'rgba(0,212,255,0.25)' }}
                >
                  {muted ? <MicOff size={15} /> : <Mic size={15} />} {muted ? 'Unmute' : 'Mute'}
                </button>
                <button
                  type="button"
                  onClick={() => void endCall()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold"
                  style={{ background: 'rgba(255,90,90,0.15)', color: '#FF8A8A' }}
                >
                  <PhoneOff size={15} /> End
                </button>
              </div>
            )}

            <p className="text-[11px] leading-snug text-white/45">
              Joe is an AI assistant, not a person. Calls are processed by ElevenLabs and a
              transcript is kept. No audio is stored.{' '}
              <a href="/privacy-policy/" className="underline">Privacy</a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!panelOpen && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { dismissNudge(); setOpen(true); }}
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-2xl"
          style={{ background: '#00D4FF', color: '#050D1A', fontFamily: 'Space Grotesk' }}
          data-conversion-placement="Voice agent launcher"
        >
          <Mic size={16} /> Talk to us
        </motion.button>
      )}
    </div>
  );
}
