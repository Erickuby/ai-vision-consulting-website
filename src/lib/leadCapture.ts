export const WEBSITE_LEAD_ENDPOINT = 'https://n8n.indoorgrowguides.com/webhook/avc-website-lead';
export const WEBSITE_CONTACT_FALLBACK_ENDPOINT = '/contact.php';

type PlausibleOptions = {
  props?: Record<string, string | number | boolean>;
};

declare global {
  interface Window {
    plausible?: (eventName: string, options?: PlausibleOptions) => void;
  }
}

export function trackConversion(eventName: string, props: PlausibleOptions['props'] = {}) {
  if (typeof window === 'undefined') return;
  window.plausible?.(eventName, { props });
}

class EndpointResponseError extends Error {}

async function postForm(endpoint: string, body: URLSearchParams) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new EndpointResponseError(`Lead endpoint returned ${response.status}.`);
    }
  } finally {
    window.clearTimeout(timeout);
  }
}

function getLeadAttribution() {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer,
  };

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']) {
    const value = params.get(key)?.trim();
    if (value) attribution[key] = value;
  }

  return attribution;
}

export async function submitWebsiteLead(payload: Record<string, string>) {
  const submissionId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const body = new URLSearchParams({ ...getLeadAttribution(), submission_id: submissionId, ...payload });

  try {
    await postForm(WEBSITE_LEAD_ENDPOINT, body);
  } catch (primaryError) {
    const canUseFallback = payload.lead_type === 'contact' && primaryError instanceof EndpointResponseError;
    if (!canUseFallback) {
      throw new Error('We could not send your details right now. Please email us or use WhatsApp instead.');
    }

    try {
      await postForm(WEBSITE_CONTACT_FALLBACK_ENDPOINT, body);
    } catch {
      throw new Error('We could not send your details right now. Please email us or use WhatsApp instead.');
    }
  }
}

export function trackOutboundEnquiryLink(href: string, label = '') {
  const value = href.toLowerCase();
  if (value.includes('cal.com/eric-nwankwo/ai-discovery-call')) {
    trackConversion('Discovery Call Click', { placement: label || 'website' });
  } else if (value.startsWith('https://wa.me/')) {
    trackConversion('WhatsApp Enquiry Click', { placement: label || 'website' });
  } else if (value.startsWith('mailto:eric@aivisionconsulting.co.uk')) {
    trackConversion('Direct Email Click', { placement: label || 'website' });
  } else if (value.includes('chat.whatsapp.com/')) {
    trackConversion('Community Join Click', { placement: label || 'website' });
  } else if (value.includes('fiverr.com/kubblicious')) {
    trackConversion('Fiverr Service Click', { placement: label || 'website' });
  }
}
