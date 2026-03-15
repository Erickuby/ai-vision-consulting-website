import { useEffect, useState } from 'react';
import { NeuralCanvas3D } from './components/NeuralCanvas3D';
import { Nav } from './components/Nav';
import { PageLoader } from './components/PageLoader';
import { ScrollProgress } from './components/ScrollProgress';
import { HeroUpgraded } from './components/HeroUpgraded';
import { SocialProofTicker } from './components/SocialProofTicker';
import { FlagshipCourses } from './components/FlagshipCourses';
import { WhatsAppCommunity } from './components/WhatsAppCommunity';
import { CoursesUpgraded } from './components/CoursesUpgraded';
import { TestimonialsUpgraded } from './components/TestimonialsUpgraded';
import { AboutUpgraded } from './components/AboutUpgraded';
import { Services } from './components/Services';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { CustomCursor } from './components/CustomCursor';
import { LegalPage, type LegalPageType } from './components/LegalPages';

type AppRoute = 'home' | LegalPageType;

function getRouteFromHash(hash: string): AppRoute {
  const route = hash.replace(/^#\/?/, '').toLowerCase();
  if (route === 'privacy-policy') return 'privacy-policy';
  if (route === 'terms-of-service') return 'terms-of-service';
  if (route === 'cookie-policy') return 'cookie-policy';
  return 'home';
}

export function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window === 'undefined' ? 'home' : getRouteFromHash(window.location.hash),
  );
  const [loaded, setLoaded] = useState(route !== 'home');

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = getRouteFromHash(window.location.hash);
      setRoute(nextRoute);
      if (nextRoute !== 'home') {
        setLoaded(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route !== 'home') {
    return <LegalPage page={route} />;
  }

  return (
    <>
      {/* Branded page loader */}
      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}

      <div className="bg-[#050D1A] min-h-screen overflow-x-hidden">
        {/* Scroll progress bar */}
        <ScrollProgress />

        {/* Fixed 3D neural network background */}
        <NeuralCanvas3D />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Sticky floating CTA */}
        <StickyCTA />

        {/* Navigation */}
        <Nav />

        {/* Main content */}
        <main>
          {/* Hero */}
          <HeroUpgraded />

          {/* Social proof ticker */}
          <SocialProofTicker />

          {/* Flagship course cards — below fold on home */}
          <FlagshipCourses />

          {/* WhatsApp community */}
          <WhatsAppCommunity />

          {/* Section separator */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" />
          </div>

          {/* All Courses */}
          <CoursesUpgraded />

          {/* Testimonials */}
          <TestimonialsUpgraded />

          {/* Section separator */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" />
          </div>

          {/* About */}
          <AboutUpgraded />

          {/* Services */}
          <Services />

          {/* Blog */}
          <Blog />

          {/* Contact */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
