// Eric confirmed on 11 September 2026 that AI Vision Consulting is not VAT registered.
export const pricingPolicy = {
  vatStatus: 'not-registered' as const,
  vatConfirmed: true,
  validFrom: '2026-09-10',
  vatShort: 'No VAT added.',
  vatStatement: 'All prices shown are final. AI Vision Consulting is not currently VAT registered, so no VAT is added.',
};

export function clarifyVat(text: string): string {
  return /£\s*\d/.test(text) && !/\bVAT\b/i.test(text)
    ? `${text} ${pricingPolicy.vatShort}`
    : text;
}
