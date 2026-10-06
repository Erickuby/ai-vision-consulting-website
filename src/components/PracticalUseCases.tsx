import { Bot, NotebookPen, CalendarClock, Scale, BarChart3, Wrench } from 'lucide-react';
import { Reveal } from './Reveal';

// These are the capabilities organisations actually pay for. Deliberately not "draft a
// document" or "summarise a meeting": a team that only learned those goes back to doing
// the job by hand within a fortnight. Every claim here is a feature that exists today on
// a paid Microsoft 365 Copilot licence, and anything still in preview is flagged as such
// in the session rather than sold as finished.
const useCases = [
  {
    icon: Bot,
    title: 'Build agents their own role needs',
    text: 'Create personalised Copilot agents for the jobs a role repeats: a bid reviewer, an onboarding buddy, a policy checker. Owned by the team that uses them, not queued behind IT.',
  },
  {
    icon: NotebookPen,
    title: 'Ground answers in your own files',
    text: 'Use Copilot Notebooks to pin the documents, policies and data a question should be answered from, so the answer comes back citing your source instead of the open web.',
  },
  {
    icon: CalendarClock,
    title: 'Hand the repeat work over',
    text: 'Use Cowork and scheduled prompts so the weekly report, the chase list and the month end pack prepare themselves on a timetable and arrive ready for a person to check.',
  },
  {
    icon: Scale,
    title: 'Pick the right model for the job',
    text: 'Know when a reasoning model earns its wait, when a fast one will do, and when Copilot, ChatGPT or Claude is the better tool, rather than defaulting to whatever opens first.',
  },
  {
    icon: BarChart3,
    title: 'Do analysis that survives scrutiny',
    text: 'Clean an inherited spreadsheet, build the pivot, run the comparison, and apply the checks that catch a wrong total before it reaches a director.',
  },
  {
    icon: Wrench,
    title: 'Build working tools, not just documents',
    text: 'Turn a manual process into a small internal tool, or a SharePoint site into an agent colleagues can question, so the knowledge stops living in one person’s head.',
  },
];

export function PracticalUseCases() {
  return (
    <section className="section-wrapper relative z-10" style={{ padding: '80px 24px' }} aria-labelledby="use-cases-heading">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center" style={{ marginBottom: '48px' }}>
          <span className="badge badge-green" style={{ display: 'inline-flex', marginBottom: '16px' }}>Practical Use Cases</span>
          <h2 id="use-cases-heading" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight">
            What your team can do <span className="gradient-text-cyan">after the training</span>
          </h2>
          <p className="text-base sm:text-lg text-[#8899AA] max-w-3xl mx-auto" style={{ marginTop: '16px' }}>
            Not a tour of whichever AI tool is fashionable that week. These are the capabilities that change
            how a week runs, taught on your own work, with the governance and human sign off built in rather
            than bolted on. Features move quickly, so sessions cover what is live on your licence and say
            plainly what is still in preview.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <article style={{ height: '100%', padding: '24px', borderRadius: '18px', background: 'linear-gradient(180deg, rgba(10,20,40,0.82), rgba(7,15,30,0.92))', border: '1px solid rgba(0,212,255,0.13)', boxShadow: '0 18px 48px rgba(0,0,0,0.18)' }}>
                <div style={{ width: 44, height: 44, display: 'grid', placeItems: 'center', borderRadius: 12, color: '#00D4FF', background: 'rgba(0,212,255,0.09)', border: '1px solid rgba(0,212,255,0.16)', marginBottom: 18 }}><Icon size={21} /></div>
                <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#F0F4FF', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '14.5px', color: '#A9B9C9', lineHeight: 1.75 }}>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
