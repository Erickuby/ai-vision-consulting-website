import { useEffect, useState, type ReactNode } from 'react';
import { NeuralCanvas3D } from './components/NeuralCanvas3D';
import { Nav } from './components/Nav';
import { ScrollProgress } from './components/ScrollProgress';
import { HeroUpgraded } from './components/HeroUpgraded';
import { SocialProofTicker } from './components/SocialProofTicker';
import { FlagshipCourses } from './components/FlagshipCourses';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { WhatsAppCommunity } from './components/WhatsAppCommunity';
import { AIJourney } from './components/AIJourney';
import { CoursesUpgraded } from './components/CoursesUpgraded';
import { TestimonialsUpgraded } from './components/TestimonialsUpgraded';
import { AboutUpgraded } from './components/AboutUpgraded';
import { WhoThisIsFor } from './components/WhoThisIsFor';
import { Services } from './components/Services';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { LegalPage, type LegalPageType } from './components/LegalPages';
import { NotFoundPage, SeoLandingPage } from './components/SeoLandingPage';
import { getSiteRoute, normalizeRoutePath } from './data/routes';
import { trackOutboundEnquiryLink } from './lib/leadCapture';

function ClientDecoration() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setMounted(true);
  }, []);
  return mounted ? <NeuralCanvas3D /> : null;
}

function SiteBackground({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#050D1A] min-h-screen overflow-x-hidden">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <ClientDecoration />
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
        {route.kind === 'not-found' ? <NotFoundPage /> : <SeoLandingPage route={route} />}
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
          <FlagshipCourses />
          <WhatsAppCommunity />
          <AIJourney />
          <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" /></div>
          <CoursesUpgraded />
          <TestimonialsUpgraded />
          <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" /></div>
          <AboutUpgraded />
          <WhoThisIsFor />
          <Services />
          <Blog />
          <Contact source="Homepage contact form" />
        </main>
        <Footer />
      </SiteBackground>
    </>
  );
}
