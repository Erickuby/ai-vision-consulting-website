import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSiteMotion } from '../lib/useSiteMotion';

const artwork: Record<string, [string, string]> = {
  '/services/ai-policy-and-governance/': ['legal', 'Illustrative policy documents and key representing responsible access'],
  '/services/ai-workflow-audit/': ['automation', 'Illustrative workspace for reviewing a business process'],
  '/ai-training-newcastle/': ['training', 'Illustrative learning workspace with a laptop and open notebook'],
  '/corporate-ai-training-uk/': ['corporate', 'Illustrative team learning table with laptops and notebooks'],
  '/ai-automation-consultant-newcastle/': ['automation', 'Illustrative workspace with a workflow on a monitor'],
  '/small-business-ai-automation/': ['automation', 'Illustrative workspace for organising business workflows'],
  '/community-employability-ai-training/': ['community', 'Illustrative shared learning table with notebooks and laptops'],
  '/case-studies/': ['corporate', 'Illustrative workshop setting, not a photograph of a client session'],
  '/pricing/': ['planning', 'Illustrative training planning desk with notebook and calculator'],
  '/contact/': ['contact', 'Illustrative setting for a conversation, with two chairs and a notebook'],
  '/privacy-policy/': ['legal', 'Illustrative document folder and key representing privacy'],
  '/terms-of-service/': ['legal', 'Illustrative folder for business documents'],
  '/cookie-policy/': ['legal', 'Illustrative document folder and key representing data protection'],
};

export function PageHeroArtwork({ path }: { path: string }) {
  const ref = useRef<HTMLElement>(null);
  const enabled = useSiteMotion();
  const reveal = path === '/corporate-ai-training-uk/' || path === '/case-studies/';
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 35%'] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0 6% 0 0)', 'inset(0 0% 0 0)']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.035, 1]);
  const isAbout = path === '/about-eric-nwankwo/';
  const [asset, alt] = artwork[path] || (path.startsWith('/courses/') ? ['training', 'Illustrative workspace for practical AI learning'] : ['contact', 'Find the right next step with AI Vision Consulting']);
  return (
    <figure ref={ref} className={`page-hero-artwork${isAbout ? ' page-hero-portrait' : ''}${reveal ? ' evidence-artwork' : ''}`}>
      <motion.div className="page-artwork-frame" style={reveal && enabled ? { clipPath } : undefined}>
      <motion.img style={reveal && enabled ? { scale } : undefined} src={isAbout ? '/profile-clean-v2.webp' : `/images/heroes/${asset}-editorial.webp`} alt={isAbout ? 'Eric Nwankwo, founder and AI trainer' : alt} width={isAbout ? 1254 : 1200} height={isAbout ? 1254 : 800} fetchPriority="high" />
      </motion.div>
      {reveal && <figcaption className="evidence-artwork-note">Illustrative learning setting, not a client-session photograph.</figcaption>}
      {isAbout && <figcaption><strong>Eric Nwankwo</strong><span>Founder and AI Trainer</span></figcaption>}
    </figure>
  );
}
