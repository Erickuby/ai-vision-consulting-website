const artwork: Record<string, [string, string]> = {
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
  const isAbout = path === '/about-eric-nwankwo/';
  const [asset, alt] = artwork[path] || ['contact', 'Find the right next step with AI Vision Consulting'];
  return (
    <figure className={`page-hero-artwork${isAbout ? ' page-hero-portrait' : ''}`}>
      <img src={isAbout ? '/profile-clean-v2.webp' : `/images/heroes/${asset}-editorial.webp`} alt={isAbout ? 'Eric Nwankwo, founder and AI trainer' : alt} width={isAbout ? 1254 : 1200} height={isAbout ? 1254 : 800} fetchPriority="high" />
      {isAbout && <figcaption><strong>Eric Nwankwo</strong><span>Founder and AI Trainer</span></figcaption>}
    </figure>
  );
}
