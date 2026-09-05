const artwork: Record<string, [string, string]> = {
  '/ai-training-newcastle/': ['training', 'An open learning notebook: learn, practise and check your work'],
  '/corporate-ai-training-uk/': ['corporate', 'A team workshop board organised around briefing, practice and review'],
  '/ai-automation-consultant-newcastle/': ['automation', 'A workflow connecting input, processing and delivery with human approval'],
  '/small-business-ai-automation/': ['business', 'Enquiries, bookings and follow-up organised into a manageable workflow'],
  '/community-employability-ai-training/': ['community', 'Shared learning connected to job applications and workplace skills'],
  '/case-studies/': ['evidence', 'Workshop notes documenting a clear brief, guided practice and human review'],
  '/pricing/': ['pricing', 'Three levels of support: a session, a workshop and a programme'],
  '/contact/': ['contact', 'A conversation about what you would like to improve'],
  '/privacy-policy/': ['privacy', 'A document and shield representing care for personal information'],
  '/terms-of-service/': ['terms', 'A working agreement with clear expectations'],
  '/cookie-policy/': ['cookies', 'Website preference controls with essential settings and optional choices'],
};

export function PageHeroArtwork({ path }: { path: string }) {
  const isAbout = path === '/about-eric-nwankwo/';
  const [asset, alt] = artwork[path] || ['contact', 'Find the right next step with AI Vision Consulting'];
  return (
    <figure className={`page-hero-artwork${isAbout ? ' page-hero-portrait' : ''}`}>
      <img src={isAbout ? '/profile-clean-v2.webp' : `/images/heroes/${asset}.svg`} alt={isAbout ? 'Eric Nwankwo, founder and AI trainer' : alt} width={isAbout ? 1254 : 720} height={isAbout ? 1254 : 600} fetchPriority="high" />
      {isAbout && <figcaption><strong>Eric Nwankwo</strong><span>Founder and AI Trainer</span></figcaption>}
    </figure>
  );
}
