import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { Nav } from './components/Nav';
import { ScrollProgress } from './components/ScrollProgress';
import { HeroUpgraded } from './components/HeroUpgraded';
import { SocialProofTicker } from './components/SocialProofTicker';
import { FlagshipCourses } from './components/FlagshipCourses';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { WhatsAppCommunity } from './components/WhatsAppCommunity';
import { AIJourney } from './components/AIJourney';
import { PracticalUseCases } from './components/PracticalUseCases';
import { CoursesUpgraded } from './components/CoursesUpgraded';
import { TestimonialsUpgraded } from './components/TestimonialsUpgraded';
import { AboutUpgraded } from './components/AboutUpgraded';
import { WhoThisIsFor } from './components/WhoThisIsFor';
import { Services } from './components/Services';
import { EngagementProcess } from './components/EngagementProcess';
import { FiverrServices } from './components/FiverrServices';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { LegalPage, type LegalPageType } from './components/LegalPages';
import { NotFoundPage, SeoLandingPage } from './components/SeoLandingPage';
import { PricingPage } from './components/PricingPage';
import { getSiteRoute, normalizeRoutePath } from './data/routes';
import { trackOutboundEnquiryLink } from './lib/leadCapture';

const MOTION_PREFERENCE_KEY = 'avc-motion-preference';

function motionIsEnabled() {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return !reducedMotion || window.localStorage.getItem(MOTION_PREFERENCE_KEY) === 'enabled';
}

function ClientDecoration() {
  const [Decoration, setDecoration] = useState<ComponentType | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(motionIsEnabled());
    update();
    media.addEventListener('change', update);
    window.addEventListener('avc-motion-change', update);
    return () => {
      media.removeEventListener('change', update);
      window.removeEventListener('avc-motion-change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !window.matchMedia('(min-width: 768px)').matches) {
      setDecoration(null);
      return;
    }

    let cancelled = false;
    const loadDecoration = () => {
      void import('./components/NeuralCanvas3D')
        .then(({ NeuralCanvas3D }) => {
          if (!cancelled) setDecoration(() => NeuralCanvas3D);
        })
        .catch(() => {
          // The canvas is decorative, so a failed optional chunk should not affect the page.
        });
    };

    const idleWindow = window as typeof window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const usedIdleCallback = typeof idleWindow.requestIdleCallback === 'function'
      && typeof idleWindow.cancelIdleCallback === 'function';
    const handle = usedIdleCallback
      ? idleWindow.requestIdleCallback!(loadDecoration, { timeout: 1500 })
      : window.setTimeout(loadDecoration, 800);

    return () => {
      cancelled = true;
      if (usedIdleCallback) idleWindow.cancelIdleCallback!(handle);
      else window.clearTimeout(handle);
    };
  }, [enabled]);

  return Decoration ? <Decoration /> : null;
}

function MotionPreferenceControl() {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const override = window.localStorage.getItem(MOTION_PREFERENCE_KEY) === 'enabled';
      setVisible(media.matches);
      setEnabled(override);
      document.documentElement.toggleAttribute('data-motion-enabled', override);
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  if (!visible) return null;

  const toggleMotion = () => {
    const next = !enabled;
    if (next) window.localStorage.setItem(MOTION_PREFERENCE_KEY, 'enabled');
    else window.localStorage.removeItem(MOTION_PREFERENCE_KEY);
    document.documentElement.toggleAttribute('data-motion-enabled', next);
    setEnabled(next);
    window.dispatchEvent(new Event('avc-motion-change'));
  };

  return (
    <button
      type="button"
      onClick={toggleMotion}
      className="motion-preference-control"
      aria-pressed={enabled}
    >
      {enabled ? 'Pause animations' : 'Enable animations'}
    </button>
  );
}

function SiteBackground({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#050D1A] min-h-screen overflow-x-hidden">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <ClientDecoration />
      <MotionPreferenceControl />
      {children}
    </div>
  );
}

const legalPageByPath: Record<string, LegalPageType> = {
  '/privacy-policy/': 'privacy-policy',
  '/terms-of-service/': 'terms-of-service',
  '/cookie-policy/': 'cookie-policy',
};

export function App({ pathname = '/' }: { pathname?: string }) {
  const route = getSiteRoute(pathname);
  const normalizedPath = normalizeRoutePath(pathname);
  const isHome = route.kind === 'home';

  useEffect(() => {
    const trackCommercialLink = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      const href = link?.getAttribute('href');
      if (!link || !href) return;
      const placement = link.dataset.conversionPlacement || link.getAttribute('aria-label') || link.textContent?.replace(/\s+/g, ' ').trim().slice(0, 80) || 'website';
      trackOutboundEnquiryLink(href, placement);
    };
    document.addEventListener('click', trackCommercialLink, { capture: true });
    return () => document.removeEventListener('click', trackCommercialLink, { capture: true });
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash;
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }));
    return () => window.cancelAnimationFrame(frame);
  }, [isHome]);

  if (route.kind === 'legal') return <LegalPage page={legalPageByPath[normalizedPath]} />;

  if (!isHome) {
    return (
      <SiteBackground>
        <Nav isHomePage={false} />
        {route.kind === 'not-found' ? <NotFoundPage /> : route.kind === 'pricing' ? <PricingPage route={route} /> : <SeoLandingPage route={route} />}
        <Footer />
      </SiteBackground>
    );
  }

  return (
    <>
      <SiteBackground>
        <StickyCTA />
        <Nav />
        <AnnouncementBanner />
        <main id="main-content">
          <HeroUpgraded />
          <SocialProofTicker />
          <TestimonialsUpgraded />
          <PracticalUseCases />
          <Services />
          <EngagementProcess />
          <FlagshipCourses />
          <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" /></div>
          <CoursesUpgraded />
          <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" /></div>
          <AboutUpgraded />
          <WhoThisIsFor />
          <AIJourney />
          <WhatsAppCommunity />
          <FiverrServices />
          <Blog />
          <Contact source="Homepage contact form" />
        </main>
        <Footer />
      </SiteBackground>
    </>
  );
}
