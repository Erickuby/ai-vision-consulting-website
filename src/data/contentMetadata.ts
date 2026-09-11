import defaults from '../../public/content-metadata.json';

export type ContentMetadata = {
  'last-reviewed': string;
  'cpd-accredited'?: boolean;
  'cpd-provider'?: string;
  'cpd-evidence-url'?: string;
};

export const contentMetadata: Record<string, ContentMetadata> = defaults;

export function validContentMetadata(value: unknown): value is ContentMetadata {
  if (!value || typeof value !== 'object') return false;
  const item = value as ContentMetadata;
  if (typeof item['last-reviewed'] !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item['last-reviewed'])) return false;
  const date = new Date(`${item['last-reviewed']}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== item['last-reviewed']) return false;
  return item['cpd-accredited'] === undefined || typeof item['cpd-accredited'] === 'boolean';
}

export function accreditationEvidence(item: ContentMetadata) {
  if (!item['cpd-accredited'] || !item['cpd-provider']?.trim() || !item['cpd-evidence-url']) return undefined;
  try {
    const url = new URL(item['cpd-evidence-url']);
    return url.protocol === 'https:' ? url.href : undefined;
  } catch { return undefined; }
}
