export const WEBSITE_LEAD_ENDPOINT = 'https://n8n.indoorgrowguides.com/webhook/avc-website-lead';

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

export async function submitWebsiteLead(payload: Record<string, string>) {
  const body = new URLSearchParams(payload);
  const response = await fetch(WEBSITE_LEAD_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body,
  });

  if (!response.ok) {
    throw new Error('We could not send your details right now. Please email us or use WhatsApp instead.');
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
