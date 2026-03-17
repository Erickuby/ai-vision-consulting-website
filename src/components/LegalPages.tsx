type LegalPageType = 'privacy-policy' | 'terms-of-service' | 'cookie-policy';

interface LegalSection {
  title: string;
  paragraphs: string[];
}

interface LegalDocument {
  title: string;
  badge: string;
  summary: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const legalDocs: Record<LegalPageType, LegalDocument> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    badge: 'Your Data',
    summary:
      'This policy explains what personal data we collect, how we use it, and your rights under applicable data protection law.',
    lastUpdated: '24 February 2026',
    sections: [
      {
        title: '1. Who We Are',
        paragraphs: [
          'AI Vision Consulting Ltd is responsible for processing your personal data when you use this website, contact us, or engage our services.',
          'If you have any privacy questions, contact us at eric@aivisionconsulting.co.uk.',
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
    badge: 'Legal Agreement',
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
    badge: 'Tracking & Storage',
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
    <div
      style={{
        minHeight: '100vh',
        background: '#050D1A',
        color: '#F0F4FF',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      {/* Ambient background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,40,80,0.6) 0%, transparent 65%)',
        }}
      />

      {/* Nav bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(5,13,26,0.9)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,212,255,0.08)',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Logo + wordmark */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
            aria-label="Back to home"
          >
            <img
              src="/logo.svg"
              width={36}
              height={36}
              alt="AI Vision Consulting logo"
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.4))' }}
            />
            <div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#F0F4FF',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                AI Vision
              </div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '9px',
                  color: '#00D4FF',
                  letterSpacing: '0.1em',
                  lineHeight: 1,
                  marginTop: '2px',
                }}
              >
                CONSULTING LTD
              </div>
            </div>
          </a>

          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              color: '#00D4FF',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.15)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
            }}
          >
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Content */}
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}
      >
        {/* Document hero */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'Space Grotesk, sans-serif',
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.25)',
              color: '#00D4FF',
              marginBottom: '16px',
            }}
          >
            {doc.badge}
          </span>

          <h1
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#F0F4FF',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {doc.title}
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: '#8899AA',
              lineHeight: 1.75,
              maxWidth: '620px',
              marginBottom: '12px',
            }}
          >
            {doc.summary}
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(10,20,40,0.7)',
              border: '1px solid rgba(0,212,255,0.1)',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#00D4FF',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '12px',
                color: '#5A6A7A',
              }}
            >
              Last updated: {doc.lastUpdated}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(0,212,255,0.2), transparent)',
            marginBottom: '40px',
          }}
        />

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {doc.sections.map((section, i) => (
            <div
              key={section.title}
              style={{
                padding: '28px 32px',
                borderRadius: '16px',
                background: i % 2 === 0 ? 'rgba(10,20,40,0.5)' : 'transparent',
                border: i % 2 === 0 ? '1px solid rgba(0,212,255,0.07)' : '1px solid transparent',
                marginBottom: '4px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '14px',
                }}
              >
                <div
                  style={{
                    width: '3px',
                    height: '20px',
                    borderRadius: '2px',
                    background: 'linear-gradient(180deg, #00D4FF, rgba(0,212,255,0.2))',
                    flexShrink: 0,
                  }}
                />
                <h2
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#E0EEFF',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {section.title}
                </h2>
              </div>
              <div style={{ paddingLeft: '15px' }}>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      fontSize: '14.5px',
                      color: '#8899AA',
                      lineHeight: 1.8,
                      marginBottom: '10px',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other legal documents */}
        <div
          style={{
            marginTop: '56px',
            padding: '32px',
            borderRadius: '18px',
            background: 'rgba(10,20,40,0.6)',
            border: '1px solid rgba(0,212,255,0.1)',
          }}
        >
          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#5A6A7A',
              marginBottom: '16px',
            }}
          >
            Other Legal Documents
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {legalLinks.map((link) => {
              const isActive = link.href === `#/${page}`;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: isActive
                      ? 'rgba(0,212,255,0.15)'
                      : 'rgba(0,212,255,0.05)',
                    border: isActive
                      ? '1px solid rgba(0,212,255,0.4)'
                      : '1px solid rgba(0,212,255,0.12)',
                    color: isActive ? '#00D4FF' : '#8899AA',
                    pointerEvents: isActive ? 'none' : 'auto',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                      e.currentTarget.style.color = '#C8D8E8';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.12)';
                      e.currentTarget.style.color = '#8899AA';
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom disclaimer */}
        <p
          style={{
            marginTop: '32px',
            fontSize: '12px',
            color: '#3A4A5A',
            textAlign: 'center',
            lineHeight: 1.7,
          }}
        >
          © 2026 AI Vision Consulting Ltd. Registered in England &amp; Wales.
          Informational content only. Not legal advice.
        </p>
      </main>
    </div>
  );
}

export type { LegalPageType };
