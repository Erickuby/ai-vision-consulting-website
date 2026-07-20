import { ArrowUpRight, Bot, CheckCircle2, MessageCircleMore, Video } from 'lucide-react';
import { Reveal } from './Reveal';

const gigs = {
  whatsapp: {
    icon: MessageCircleMore,
    eyebrow: 'Lead response and booking',
    title: 'WhatsApp AI Lead Agent',
    description: 'A practical WhatsApp workflow that can respond to enquiries, ask qualification questions, support booking and pass conversations to a human when needed.',
    points: ['Lead qualification flow', 'Booking and follow-up support', 'Clear human handover'],
    href: 'https://www.fiverr.com/kubblicious/build-a-whatsapp-ai-lead-agent-for-service-businesses',
    cta: 'View WhatsApp agent gig',
  },
  chatbot: {
    icon: Bot,
    eyebrow: 'Customer support and enquiries',
    title: 'Website and Document AI Chatbot',
    description: 'Turn approved website pages, PDFs or knowledge-base content into a focused chatbot for common questions and enquiry capture.',
    points: ['Website or document sources', 'Common-question support', 'Enquiry capture'],
    href: 'https://www.fiverr.com/kubblicious/build-an-ai-chatbot-trained-on-your-documents-and-website',
    cta: 'View chatbot gig',
  },
  avatar: {
    icon: Video,
    eyebrow: 'Video content and adverts',
    title: 'AI Avatar Spokesperson Videos',
    description: 'Create AI-presented videos and UGC-style adverts for landing pages, TikTok, Reels, Shorts and other business channels.',
    points: ['AI-presented video', 'UGC-style advert format', 'Business and social channels'],
    href: 'https://www.fiverr.com/kubblicious/create-ai-avatar-spokesperson-videos-and-ugc-ads-with-heygen',
    cta: 'View avatar video gig',
  },
};

function ExternalCTA({ href, children, placement }: { href: string; children: string; placement: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-conversion-placement={placement}
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[rgba(0,212,255,0.35)] bg-[rgba(0,212,255,0.08)] px-5 py-2.5 font-display text-sm font-semibold text-[#8CEEFF] transition-colors hover:border-[rgba(0,212,255,0.65)] hover:bg-[rgba(0,212,255,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD700] sm:w-auto"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function FiverrServices() {
  return (
    <section id="fiverr-services" aria-labelledby="fiverr-services-heading" className="section-wrapper relative px-6 py-16 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-9 max-w-3xl md:mb-12">
          <span className="badge badge-cyan mb-4 inline-block">Done-for-you Fiverr services</span>
          <h2 id="fiverr-services-heading" className="font-display text-3xl font-bold leading-tight tracking-tight text-[#F0F4FF] sm:text-4xl md:text-5xl">
            Prefer it built for you? Choose a Fiverr service.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9AABBC] sm:text-[17px]">
            Choose the service that matches your project. Review the scope, packages and requirements on Fiverr, then order or message me there.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {Object.values(gigs).map((gig, index) => {
            const Icon = gig.icon;
            const featured = index === 0;

            return (
              <Reveal key={gig.title} className="h-full">
                <article
                  className={`flex h-full flex-col rounded-3xl border p-7 ${
                    featured
                      ? 'border-[rgba(0,212,255,0.22)] bg-[rgba(8,20,39,0.92)]'
                      : 'border-[rgba(167,139,250,0.18)] bg-[rgba(10,20,40,0.72)]'
                  }`}
                  style={featured ? { boxShadow: '0 24px 70px rgba(0, 13, 30, 0.35)' } : undefined}
                >
                  <div className="mb-7 flex min-h-14 items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                        featured
                          ? 'border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.08)]'
                          : 'border-[rgba(167,139,250,0.22)] bg-[rgba(167,139,250,0.08)]'
                      }`}
                    >
                      <Icon size={24} color={featured ? '#00D4FF' : '#B9A2FF'} aria-hidden="true" />
                    </div>
                    {featured && (
                      <span className="rounded-full border border-[rgba(0,212,255,0.18)] bg-[rgba(0,212,255,0.06)] px-3 py-1.5 text-right text-[11px] font-semibold leading-4 text-[#8CEEFF]">
                        Best for service businesses
                      </span>
                    )}
                  </div>

                  <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${featured ? 'text-[#00D4FF]' : 'text-[#B9A2FF]'}`}>
                    {gig.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-[#F0F4FF]">{gig.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-[#9AABBC]">{gig.description}</p>

                  <ul className="mb-7 mt-6 grid gap-3">
                    {gig.points.map(point => (
                      <li key={point} className="flex items-start gap-2 text-sm leading-6 text-[#C8D8E8]">
                        <CheckCircle2 size={16} color={featured ? '#00D4FF' : '#B9A2FF'} className="mt-1 shrink-0" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <ExternalCTA href={gig.href} placement={`Fiverr ${gig.title}`}>
                      {gig.cta}
                    </ExternalCTA>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-[rgba(255,215,0,0.16)] bg-[rgba(255,215,0,0.04)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-base font-semibold text-[#F0F4FF]">Not sure which service fits?</p>
              <p className="mt-1 text-sm text-[#9AABBC]">Browse the full profile or message me on Fiverr before ordering.</p>
            </div>
            <a
              href="https://www.fiverr.com/kubblicious"
              target="_blank"
              rel="noopener noreferrer"
              data-conversion-placement="Fiverr profile"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[rgba(255,215,0,0.45)] px-5 py-2.5 font-display text-sm font-bold text-[#FFE66B] transition-colors hover:bg-[rgba(255,215,0,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
            >
              Browse Fiverr profile
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
