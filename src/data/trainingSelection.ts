import { individualRates } from './training';

// Combine published bundles to give any number of one-hour sessions the lowest price.
export function trainingTotal(count: number): number {
  const bundles = individualRates.map(({ sessions, price }) => [sessions, price]);
  if (!Number.isInteger(count) || count < 0) throw new RangeError('Session count must be a non-negative integer');
  const totals = [0];
  for (let hours = 1; hours <= count; hours++) {
    totals[hours] = Math.min(...bundles.filter(([size]) => size <= hours).map(([size, price]) => totals[hours - size] + price));
  }
  return totals[count];
}

export function trainingBookingUrl(details: string): string {
  return 'https://cal.com/eric-nwankwo/ai-discovery-call?notes=' + encodeURIComponent(details);
}
