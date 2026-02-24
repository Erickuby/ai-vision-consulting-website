type LegalPageType = 'privacy-policy' | 'terms-of-service' | 'cookie-policy';

interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalDocument {
  title: string;
  summary: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const legalDocs: Record<LegalPageType, LegalDocument> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    summary:
      'This policy explains what personal data we collect, how we use it, and your rights under applicable data protection law.',
    lastUpdated: '24 February 2026',
    sections: [
      {
        title: '1. Who We Are',
        paragraphs: [
          'AI Vision Consulting Ltd is responsible for processing your personal data when you use this website, contact us, or engage our services.',
          'If you have any privacy questions, contact us at hello@aivisionconsulting.co.uk.',
        ],
      },
      {
        title: '2. Data We Collect',
        paragraphs: [
          'We may collect your name, email address, enquiry details, and any information you submit through our contact form.',
          'We may also collect limited technical data required to run and secure the website, such as browser and device metadata.',
        ],
      },
      {
        title: '3. How We Use Your Data',
        paragraphs: [
          'We use your data to respond to enquiries, provide requested services, improve our website, and communicate service-related information.',
          'We do not sell your personal data.',
        ],
      },
      {
        title: '4. Legal Bases for Processing',
        paragraphs: [
          'Where applicable, we process data under one or more lawful bases: your consent, performance of a contract, legal obligation, or legitimate interests.',
        ],
      },
      {
        title: '5. Data Sharing and Retention',
        paragraphs: [
          'We share data only with trusted service providers necessary for delivering website and communication functions (for example, form delivery providers).',
          'We retain personal data only as long as reasonably necessary for the purpose collected, legal requirements, or dispute resolution.',
        ],
      },
      {
        title: '6. Your Rights',
        paragraphs: [
          'Depending on your location and applicable law, you may have rights to access, correct, delete, restrict, or object to processing of your personal data.',
          'You may also have the right to withdraw consent and lodge a complaint with your local data protection authority.',
        ],
      },
      {
        title: '7. Security',
        paragraphs: [
          'We use appropriate technical and organizational safeguards to protect personal data. No internet transmission is completely secure, but we take reasonable steps to reduce risk.',
        ],
      },
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    summary:
      'These terms govern your use of this website and related services provided by AI Vision Consulting Ltd.',
    lastUpdated: '24 February 2026',
    sections: [
      {
        title: '1. Acceptance of Terms',
        paragraphs: [
          'By accessing this website or using our services, you agree to these Terms of Service. If you do not agree, you should not use the site or services.',
        ],
      },
      {
        title: '2. Services',
        paragraphs: [
          'AI Vision Consulting Ltd provides AI education, advisory, and related resources. Service details, availability, and pricing may change at any time.',
        ],
      },
      {
        title: '3. User Responsibilities',
        paragraphs: [
          'You agree to use the website lawfully and not to interfere with site security, functionality, or access by other users.',
          'You are responsible for ensuring that information you submit is accurate and up to date.',
        ],
      },
      {
        title: '4. Intellectual Property',
        paragraphs: [
          'All website content, branding, and materials are owned by or licensed to AI Vision Consulting Ltd unless otherwise stated.',
          'You may not copy, redistribute, or commercially exploit content without prior written permission.',
        ],
      },
      {
        title: '5. Payments and Refunds',
        paragraphs: [
          'Where paid services are offered, pricing and payment terms will be presented before purchase.',
          'Any refund terms will be specified for the relevant product or service at the point of sale.',
        ],
      },
      {
        title: '6. Disclaimers and Liability',
        paragraphs: [
          'Content is provided for general information and education. It is not legal, tax, or financial advice.',
          'To the fullest extent permitted by law, AI Vision Consulting Ltd is not liable for indirect, incidental, or consequential losses arising from use of this website or services.',
        ],
      },
      {
        title: '7. Governing Law',
        paragraphs: [
          'These terms are governed by the laws of England and Wales. Any disputes will be subject to the courts of England and Wales unless mandatory law requires otherwise.',
        ],
      },
    ],
  },
  'cookie-policy': {
    title: 'Cookie Policy',
    summary:
      'This policy explains how cookies and similar technologies are used on this website.',
    lastUpdated: '24 February 2026',
    sections: [
      {
        title: '1. What Cookies Are',
        paragraphs: [
          'Cookies are small text files stored on your device when you visit a website. They help websites function and, in some cases, help analyze usage.',
        ],
      },
      {
        title: '2. Cookies We Use',
        paragraphs: [
          'We use essential and functional technologies required for core website operation and user experience.',
          'As of 24 February 2026, this site does not run third-party advertising cookies.',
        ],
      },
      {
        title: '3. Third-Party Services',
        paragraphs: [
          'When you follow external links or use third-party tools (for example, external booking or email services), those providers may set their own cookies under their own policies.',
        ],
      },
      {
        title: '4. Managing Cookies',
        paragraphs: [
          'You can control or delete cookies through your browser settings. Disabling certain cookies may affect site functionality.',
        ],
      },
      {
        title: '5. Updates to This Policy',
        paragraphs: [
          'We may update this Cookie Policy from time to time. The latest version will always be published on this page with the updated date.',
        ],
      },
    ],
  },
};

const legalLinks: Array<{ label: string; href: `#/${LegalPageType}` }> = [
  { label: 'Privacy Policy', href: '#/privacy-policy' },
  { label: 'Terms of Service', href: '#/terms-of-service' },
  { label: 'Cookie Policy', href: '#/cookie-policy' },
];

export function LegalPage({ page }: { page: LegalPageType }) {
  const doc = legalDocs[page];

  return (
    <div className="bg-[#050D1A] min-h-screen text-[#F0F4FF] px-6 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          <a
            href="#"
            style={{
              textDecoration: 'none',
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: '20px',
              color: '#F0F4FF',
              letterSpacing: '-0.01em',
            }}
            aria-label="Back to home page"
          >
            AI Vision Consulting
          </a>
          <a
            href="#"
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            Back to Home
          </a>
        </header>

        <article
          className="glass-card"
          style={{
            padding: '28px',
            borderRadius: '18px',
          }}
        >
          <p
            style={{
              fontFamily: 'Space Grotesk',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#00D4FF',
              marginBottom: '10px',
            }}
          >
            Legal
          </p>

          <h1
            style={{
              fontFamily: 'Space Grotesk',
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '10px',
            }}
          >
            {doc.title}
          </h1>

          <p
            style={{
              fontFamily: 'Plus Jakarta Sans',
              color: '#8899AA',
              lineHeight: 1.75,
              marginBottom: '6px',
            }}
          >
            {doc.summary}
          </p>
          <p
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: '13px',
              color: '#5A6A7A',
              marginBottom: '24px',
            }}
          >
            Last updated: {doc.lastUpdated}
          </p>

          <div style={{ display: 'grid', gap: '20px' }}>
            {doc.sections.map((section) => (
              <section key={section.title}>
                <h2
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}
                >
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      fontFamily: 'Plus Jakarta Sans',
                      color: '#A9B6C5',
                      lineHeight: 1.75,
                      marginBottom: '10px',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>

        <footer
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: '13px',
                  color: '#8899AA',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <span
            style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: '12px',
              color: '#5A6A7A',
            }}
          >
            Informational content only, not legal advice.
          </span>
        </footer>
      </div>
    </div>
  );
}

export type { LegalPageType };
