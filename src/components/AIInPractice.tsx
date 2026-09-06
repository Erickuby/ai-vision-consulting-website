import { useEffect, useState } from 'react';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { useSiteMotion } from '../lib/useSiteMotion';

const examples = [
  {
    label: 'Work productivity', title: 'Turn meeting notes into clear next steps',
    tool: 'For a Copilot or general AI training session',
    prompt: 'Using these sample notes, create an action list with an owner and deadline. Do not invent missing details. Notes: Alex will send the draft on Tuesday. Priya will check the figures. The team will review on Friday.',
    response: '1. Send the draft — Alex — Tuesday.\n2. Check the figures — Priya — deadline not recorded; confirm with Priya.\n3. Review the draft — team — Friday.\n\nBefore sharing: confirm the calendar dates and who will lead the review.',
    lesson: 'Give the tool source material, specify the format and check what is missing.',
  },
  {
    label: 'Job applications', title: 'Build an application around your own evidence',
    tool: 'For practical AI and career-focused learning',
    prompt: 'Help me structure a STAR example about organising a shared inbox. I prioritised urgent queries and wrote a handover guide. Ask me for missing evidence before drafting. Do not invent results or numbers.',
    response: 'Situation: What problem did the team face with the inbox?\nTask: What were you personally responsible for?\nAction: How did you decide what was urgent, and what did your handover guide include?\nResult: What changed, and what evidence can you honestly provide?\n\nUse your answers to build a specific example in your own words.',
    lesson: 'Use AI to organise genuine experience, not manufacture achievements.',
  },
  {
    label: 'Content creation', title: 'Turn one useful lesson into a content plan',
    tool: 'For content creation and practical AI training',
    prompt: 'Turn this lesson into a three-post LinkedIn plan for busy professionals: a useful prompt includes the task, context and output format. Use plain UK English. Give each post one practical action. Avoid performance claims.',
    response: 'Post 1 — Define the task. Show a vague request beside a specific one. Action: rewrite one prompt you use at work.\n\nPost 2 — Add context. Explain what the reader and purpose change. Action: add the audience to your prompt.\n\nPost 3 — Choose the output. Compare a paragraph with an action list. Action: ask for the format you actually need.',
    lesson: 'Start with a useful idea and give each piece of content a clear purpose.',
  },
];

export function AIInPractice() {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const enabled = useSiteMotion();
  const example = examples[selected];
  const words = example.response.split(/(\s+)/);
  const complete = count === null || count >= words.length;

  useEffect(() => {
    if (!enabled) { setPlaying(false); setCount(null); }
  }, [enabled]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setCount(previous => {
      const next = (previous ?? 0) + 2;
      return Math.min(next, words.length);
    }), 65);
    const pauseWhenHidden = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', pauseWhenHidden); };
  }, [playing, words.length]);

  useEffect(() => { if (complete) setPlaying(false); }, [complete]);

  return <section className="ai-practice section-wrapper" aria-labelledby="ai-practice-title">
    <div className="ai-practice-inner">
      <div className="ai-practice-intro">
        <h2 id="ai-practice-title">See what a better brief can do.</h2>
        <p>Explore a small example of the practical thinking we work on in a session. Choose a task, read the brief and see how the response becomes more useful.</p>
      </div>
      <div className="ai-practice-choices" role="group" aria-label="Choose an AI example">
        {examples.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} aria-controls="ai-example" onClick={() => { setSelected(index); setPlaying(false); setCount(null); }}>{item.label}</button>)}
      </div>
      <div id="ai-example" className="ai-example">
        <div className="ai-example-brief">
          <h3>{example.title}</h3>
          <p className="ai-example-tool">{example.tool}</p>
          <h4>The brief</h4>
          <p>{example.prompt}</p>
          <a className="hero-text-link" href="/pricing/">Choose your training topics <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="ai-example-result">
          <div className="ai-example-toolbar"><h4>Example response</h4>{enabled && <button type="button" onClick={() => { if (playing) setPlaying(false); else { if (complete) setCount(0); setPlaying(true); } }}>{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}{playing ? 'Pause' : complete ? 'Play example' : 'Continue'}</button>}</div>
          <div className="ai-example-response">
            <p className="ai-example-reserved" aria-hidden="true">{example.response}</p>
            <p className="ai-example-visible" aria-hidden="true">{complete ? example.response : words.slice(0, count ?? 0).join('')}</p>
            <p className="sr-only">{example.response}</p>
          </div>
          {!complete && <button className="ai-show-full" type="button" onClick={() => { setCount(null); setPlaying(false); }}>Show full response</button>}
          <p className="ai-example-lesson">{example.lesson}</p>
          <p className="ai-example-disclosure">Prepared demonstration, not a live AI response. No information is sent to an AI service.</p>
        </div>
      </div>
      <p className="sr-only" role="status">{example.label} example selected. {playing ? 'Playing demonstration.' : complete ? 'Full response available.' : 'Demonstration paused.'}</p>
    </div>
  </section>;
}
