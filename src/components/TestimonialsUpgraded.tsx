import { Reveal } from './Reveal';

export function TestimonialsUpgraded() {
  return (
    <section className="relative z-10" style={{ padding: '80px 24px' }} aria-label="Testimonials">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="badge badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>Real Results</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F4FF] tracking-tight">
            People whose lives have <span className="gradient-text-cyan">changed</span>
          </h2>
        </Reveal>

        {/* Placeholder Card */}
        <Reveal delay={0.2}>
          <div
            className="rounded-3xl max-w-2xl mx-auto text-center"
            style={{
              padding: '48px',
              background: 'rgba(10,20,40,0.7)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,212,255,0.2)',
            }}
          >
            <p className="text-lg md:text-xl text-[#C8D8E8] leading-relaxed mb-6">
              We are currently collecting student success stories. Train with us and be the first to share yours.
            </p>
            <button
              onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-[#00D4FF] hover:text-[#00FF88] transition-colors font-medium inline-flex items-center gap-2"
            >
              Book your first session &rarr;
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
