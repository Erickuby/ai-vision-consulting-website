<?php
declare(strict_types=1);

$formspreeEndpoint = 'https://formspree.io/f/mpqyoypl';
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Direct Contact | AI Vision Consulting Ltd</title>
    <meta name="robots" content="noindex,nofollow" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #050d1a;
        --panel: rgba(10, 20, 40, 0.82);
        --panel-soft: rgba(10, 20, 40, 0.64);
        --border: rgba(0, 212, 255, 0.16);
        --text: #f0f4ff;
        --muted: #92a3b5;
        --cyan: #00d4ff;
        --gold: #ffb81c;
        --green: #00c864;
        --danger: #ff7e7e;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: 'Plus Jakarta Sans', sans-serif;
        background:
          radial-gradient(circle at top, rgba(0, 64, 128, 0.25), transparent 38%),
          linear-gradient(180deg, #081324 0%, #050d1a 100%);
        color: var(--text);
        min-height: 100vh;
      }

      a {
        color: inherit;
      }

      .page {
        max-width: 1180px;
        margin: 0 auto;
        padding: 48px 20px 72px;
      }

      .topbar {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 36px;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
      }

      .brand img {
        width: 44px;
        height: 44px;
      }

      .brand strong {
        display: block;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 18px;
        line-height: 1;
      }

      .brand span {
        display: block;
        color: var(--cyan);
        font-size: 12px;
        letter-spacing: 0.08em;
        margin-top: 4px;
      }

      .home-link {
        text-decoration: none;
        padding: 12px 18px;
        border-radius: 999px;
        border: 1px solid rgba(255, 184, 28, 0.28);
        color: var(--gold);
        font-weight: 700;
      }

      .hero {
        max-width: 760px;
        margin-bottom: 28px;
      }

      .eyebrow {
        display: inline-block;
        margin-bottom: 16px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid rgba(0, 212, 255, 0.22);
        color: var(--cyan);
        font-family: 'Space Grotesk', sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      h1 {
        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(2.2rem, 5vw, 4.2rem);
        line-height: 1.05;
        margin: 0 0 16px;
      }

      .highlight {
        color: var(--gold);
      }

      .hero p {
        max-width: 640px;
        font-size: 18px;
        line-height: 1.8;
        color: var(--muted);
        margin: 0;
      }

      .grid {
        display: grid;
        grid-template-columns: minmax(280px, 0.92fr) minmax(320px, 1.08fr);
        gap: 24px;
      }

      .card {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        backdrop-filter: blur(14px);
      }

      .card h2,
      .card h3 {
        font-family: 'Space Grotesk', sans-serif;
        margin-top: 0;
      }

      .stack {
        display: grid;
        gap: 16px;
      }

      .note {
        padding: 16px 18px;
        border-radius: 16px;
        line-height: 1.7;
      }

      .note[hidden] {
        display: none;
      }

      .note.success {
        background: rgba(0, 200, 100, 0.12);
        border: 1px solid rgba(0, 200, 100, 0.24);
        color: #cff4dd;
      }

      .note.error {
        background: rgba(255, 80, 80, 0.1);
        border: 1px solid rgba(255, 80, 80, 0.22);
        color: #ffb9b9;
      }

      .options {
        display: grid;
        gap: 12px;
      }

      .option-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 16px 18px;
        border-radius: 18px;
        background: var(--panel-soft);
        border: 1px solid rgba(0, 212, 255, 0.12);
        text-decoration: none;
      }

      .option-link strong {
        display: block;
        margin-bottom: 4px;
      }

      .option-link span {
        color: var(--muted);
        font-size: 14px;
      }

      form {
        display: grid;
        gap: 16px;
      }

      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      label {
        display: block;
        font-size: 13px;
        font-weight: 700;
        color: var(--muted);
        margin-bottom: 8px;
      }

      input,
      select,
      textarea {
        width: 100%;
        border-radius: 16px;
        border: 1px solid rgba(0, 212, 255, 0.16);
        background: rgba(7, 16, 30, 0.92);
        color: var(--text);
        padding: 14px 16px;
        font: inherit;
      }

      textarea {
        min-height: 160px;
        resize: vertical;
      }

      .honeypot {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }

      .button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 16px 20px;
        border: 0;
        border-radius: 16px;
        background: linear-gradient(90deg, #ffd11a 0%, #ffb81c 100%);
        color: #061120;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
      }

      .button:disabled {
        opacity: 0.72;
        cursor: wait;
      }

      .meta {
        margin-top: 8px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.7;
      }

      @media (max-width: 900px) {
        .grid,
        .row {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <div class="topbar">
        <a class="brand" href="/">
          <img src="/logo.svg" alt="AI Vision Consulting logo" />
          <div>
            <strong>AI Vision</strong>
            <span>CONSULTING LTD</span>
          </div>
        </a>
        <a class="home-link" href="/">Back to Homepage</a>
      </div>

      <section class="hero">
        <div class="eyebrow">Direct Contact Page</div>
        <h1>Your AI journey starts with a <span class="highlight">conversation</span></h1>
        <p>
          This is the direct fallback contact page for AI Vision Consulting. If the main site is cached or slow to update,
          you can use this page to send a message straight to us.
        </p>
      </section>

      <section class="grid">
        <div class="stack">
          <div class="card">
            <h2>Quick contact options</h2>
            <div class="options">
              <a class="option-link" href="mailto:eric@aivisionconsulting.co.uk?subject=Website%20Enquiry">
                <div>
                  <strong>Email directly</strong>
                  <span>eric@aivisionconsulting.co.uk</span>
                </div>
                <span>Open mail app</span>
              </a>
              <a class="option-link" href="https://wa.me/447341183915?text=Hi%20Eric%2C%20I%20would%20like%20to%20ask%20about%20AI%20training%20or%20consulting." target="_blank" rel="noopener noreferrer">
                <div>
                  <strong>Message on WhatsApp</strong>
                  <span>+44 7341 183915</span>
                </div>
                <span>Open WhatsApp</span>
              </a>
              <a class="option-link" href="https://calendly.com/ericcnwankwo/30min?month=2026-03" target="_blank" rel="noopener noreferrer">
                <div>
                  <strong>Book an assessment</strong>
                  <span>Free 15-minute AI assessment</span>
                </div>
                <span>Open Calendly</span>
              </a>
            </div>
          </div>

          <div class="card">
            <h3>Contact details</h3>
            <p class="meta">
              Newcastle upon Tyne, UK<br />
              Serving the UK, remote and in person<br /><br />
              Email: eric@aivisionconsulting.co.uk<br />
              Phone: +44 7341 183915
            </p>
          </div>
        </div>

        <div class="card">
          <h2>Send us a message</h2>

          <div class="note" id="form-status" hidden></div>

          <form id="contact-form" action="<?php echo htmlspecialchars($formspreeEndpoint, ENT_QUOTES, 'UTF-8'); ?>" method="post">
            <input type="hidden" name="subject" id="subject" value="Website enquiry: General Enquiry" />
            <input type="hidden" name="source" value="Direct contact page" />

            <div class="honeypot" aria-hidden="true">
              <label for="website">Website</label>
              <input id="website" name="website" type="text" autocomplete="off" tabindex="-1" />
            </div>

            <div class="row">
              <div>
                <label for="name">Full Name *</label>
                <input id="name" name="name" type="text" required />
              </div>
              <div>
                <label for="email">Email Address *</label>
                <input id="email" name="email" type="email" required />
              </div>
            </div>

            <div>
              <label for="enquiryType">I am a... *</label>
              <select id="enquiryType" name="enquiryType" required>
                <option value="">Select your situation</option>
                <option value="jobseeker">Jobseeker</option>
                <option value="professional">Professional looking to upskill</option>
                <option value="business">Small business owner</option>
                <option value="corporate">Corporate / HR enquiry</option>
                <option value="partner">Community or Jobcentre partner</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label for="message">Your Message *</label>
              <textarea id="message" name="message" required placeholder="Tell us a little about what you need help with."></textarea>
            </div>

            <button class="button" id="submit-button" type="submit">Send Message</button>
          </form>

          <p class="meta">
            If you prefer not to use the form, email us directly or send a WhatsApp message using the options on this page.
          </p>
        </div>
      </section>
    </main>
    <script>
      const contactForm = document.getElementById('contact-form');
      const statusBox = document.getElementById('form-status');
      const submitButton = document.getElementById('submit-button');
      const enquiryType = document.getElementById('enquiryType');
      const subjectField = document.getElementById('subject');

      const enquiryLabels = {
        jobseeker: 'Jobseeker',
        professional: 'Professional Upskilling',
        business: 'Small Business',
        corporate: 'Corporate / HR',
        partner: 'Community Partner',
        other: 'General Enquiry',
      };

      function getSubject(value) {
        return 'Website enquiry: ' + (enquiryLabels[value] || 'General Enquiry');
      }

      function showStatus(type, message) {
        statusBox.hidden = false;
        statusBox.className = 'note ' + type;
        statusBox.textContent = message;
      }

      function syncSubject() {
        subjectField.value = getSubject(enquiryType.value);
      }

      enquiryType.addEventListener('change', syncSubject);
      syncSubject();

      contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        syncSubject();
        statusBox.hidden = true;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
              'Accept': 'application/json'
            }
          });

          const result = await response.json().catch(function () {
            return null;
          });

          if (!response.ok) {
            const message = Array.isArray(result && result.errors)
              ? result.errors.map(function (item) { return item && item.message; }).filter(Boolean).join(' ')
              : '';

            throw new Error(message || 'We could not send your message right now. Please email us or use WhatsApp instead.');
          }

          contactForm.reset();
          syncSubject();
          showStatus('success', 'Thanks for your message. We will be in touch soon.');
        } catch (error) {
          showStatus(
            'error',
            error instanceof Error && error.message
              ? error.message
              : 'We could not send your message right now. Please email us or use WhatsApp instead.'
          );
        } finally {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
      });
    </script>
  </body>
</html>
