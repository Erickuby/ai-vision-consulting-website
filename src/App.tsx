import { useEffect, useState, type ReactNode } from 'react';
import { NeuralCanvas3D } from './components/NeuralCanvas3D';
import { Nav } from './components/Nav';
import { PageLoader } from './components/PageLoader';
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
import { BlogPostPage } from './components/BlogPostPage';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { CustomCursor } from './components/CustomCursor';
import { LegalPage, type LegalPageType } from './components/LegalPages';
import { getBlogPostBySlug } from './data/blog';

type AppRoute =
  | { type: 'home' }
  | { type: 'legal'; page: LegalPageType }
  | { type: 'blog'; slug: string };

function getHashRoute(hash: string): AppRoute | null {
  if (!hash.startsWith('#/')) {
    return null;
  }

  const route = hash.replace(/^#\/?/, '').toLowerCase();

  if (route === 'privacy-policy') return { type: 'legal', page: 'privacy-policy' };
  if (route === 'terms-of-service') return { type: 'legal', page: 'terms-of-service' };
  if (route === 'cookie-policy') return { type: 'legal', page: 'cookie-policy' };
  if (route.startsWith('blog/')) return { type: 'blog', slug: route.slice('blog/'.length) };

  return { type: 'home' };
}

function normalizePathname(pathname: string) {
  const normalized = pathname.toLowerCase().replace(/\/+$/, '');
  return normalized || '/';
}

function getRouteFromLocation(location: Location): AppRoute {
  const hashRoute = getHashRoute(location.hash);
  if (hashRoute) {
    return hashRoute;
  }

  const pathname = normalizePathname(location.pathname);

  if (pathname === '/' || pathname === '/index.html') return { type: 'home' };
  if (pathname === '/privacy-policy') return { type: 'legal', page: 'privacy-policy' };
  if (pathname === '/terms-of-service') return { type: 'legal', page: 'terms-of-service' };
  if (pathname === '/cookie-policy') return { type: 'legal', page: 'cookie-policy' };
  if (pathname.startsWith('/blog/')) return { type: 'blog', slug: pathname.slice('/blog/'.length) };

  return { type: 'home' };
}

function SiteBackground({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#050D1A] min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <NeuralCanvas3D />
      <CustomCursor />
      {children}
    </div>
  );
}

export function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window === 'undefined' ? { type: 'home' } : getRouteFromLocation(window.location),
  );
  const [loaded, setLoaded] = useState(route.type !== 'home');

  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = getRouteFromLocation(window.location);
      setRoute(nextRoute);

      if (nextRoute.type !== 'home') {
        setLoaded(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useEffect(() => {
    if (route.type !== 'home') {
      return;
    }

    const hash = window.location.hash;
    if (!hash || hash.startsWith('#/')) {
      return;
    }

    const targetId = hash.replace(/^#/, '');
    const timeout = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto' });
    }, loaded ? 0 : 2500);

    return () => window.clearTimeout(timeout);
  }, [route, loaded]);

  if (route.type === 'legal') {
    return <LegalPage page={route.page} />;
  }

  if (route.type === 'blog') {
    const post = getBlogPostBySlug(route.slug);

    return (
      <SiteBackground>
        <Nav isHomePage={false} />
        <BlogPostPage post={post} />
        <Footer isHomePage={false} />
      </SiteBackground>
    );
  }

  return (
    <>
      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}

      <SiteBackground>
        <StickyCTA />
        <Nav />
        <AnnouncementBanner />

        <main>
          <HeroUpgraded />
          <SocialProofTicker />
          <FlagshipCourses />
          <WhatsAppCommunity />
          <AIJourney />

          <div className="max-w-6xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" />
          </div>

          <CoursesUpgraded />
          <TestimonialsUpgraded />

          <div className="max-w-6xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" />
          </div>

          <AboutUpgraded />
          <WhoThisIsFor />
          <Services />
          <Blog />
          <Contact />
        </main>

        <Footer />
      </SiteBackground>
    </>
  );
}
