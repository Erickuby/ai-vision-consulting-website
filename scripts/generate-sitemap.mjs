// Regenerates public/sitemap.xml with truthful <lastmod> values.
//
// Blog URLs take the article's own publication date from src/data/blog.ts.
// Every other URL takes the last commit date that touched the site source,
// so the value only moves when the pages actually change.

import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const SITE_URL = 'https://aivisionconsulting.co.uk';

const STATIC_PATHS = [
  '/',
  '/ai-training-newcastle/',
  '/ai-automation-consultant-newcastle/',
  '/corporate-ai-training-uk/',
  '/small-business-ai-automation/',
  '/community-employability-ai-training/',
  '/about-eric-nwankwo/',
  '/case-studies/',
  '/pricing/',
  '/contact/',
];

const LEGAL_PATHS = ['/privacy-policy/', '/terms-of-service/', '/cookie-policy/'];

const MONTHS = {
  jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
  jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
};

const FULL_MONTHS = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
};

function isoFromPostDate(value) {
  const match = /^(\d{1,2})\s+([A-Za-z]{3})[a-z]*\s+(\d{4})$/.exec(value.trim());
  if (!match) throw new Error(`Unrecognised blog date: ${value}`);
  const [, day, month, year] = match;
  const key = month.toLowerCase();
  if (!MONTHS[key]) throw new Error(`Unrecognised month: ${value}`);
  return `${year}-${MONTHS[key]}-${day.padStart(2, '0')}`;
}

function lastCommitDate(...paths) {
  const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
    cwd: root,
    encoding: 'utf8',
  }).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(out)) throw new Error(`Unusable git date: ${out}`);
  return out;
}

const blogSource = await readFile(path.join(root, 'src', 'data', 'blog.ts'), 'utf8');
const posts = [];
const entryPattern = /slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
let match;
while ((match = entryPattern.exec(blogSource)) !== null) {
  posts.push({ slug: match[1], lastmod: isoFromPostDate(match[2]) });
}
if (posts.length === 0) throw new Error('No blog posts parsed from src/data/blog.ts');

const siteLastmod = lastCommitDate('src', 'index.html', 'scripts');

// The legal pages state their own review date on the page. Mirror it rather than
// the commit date, so lastmod tracks the policy text and not incidental restyling.
const legalSource = await readFile(path.join(root, 'src', 'components', 'LegalPages.tsx'), 'utf8');
const legalMatch = /lastUpdated:\s*'(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})'/.exec(legalSource);
if (!legalMatch) throw new Error('Could not read lastUpdated from LegalPages.tsx');
const legalMonth = FULL_MONTHS[legalMatch[2].toLowerCase()];
if (!legalMonth) throw new Error(`Unrecognised legal month: ${legalMatch[2]}`);
const legalLastmod = `${legalMatch[3]}-${legalMonth}-${legalMatch[1].padStart(2, '0')}`;

const entries = [
  ...STATIC_PATHS.map((p) => ({ loc: `${SITE_URL}${p}`, lastmod: siteLastmod })),
  ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.lastmod })),
  ...LEGAL_PATHS.map((p) => ({ loc: `${SITE_URL}${p}`, lastmod: legalLastmod })),
];

const seen = new Set();
for (const entry of entries) {
  if (seen.has(entry.loc)) throw new Error(`Duplicate sitemap URL: ${entry.loc}`);
  seen.add(entry.loc);
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map((e) => `  <url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');

const target = path.join(root, 'public', 'sitemap.xml');
await writeFile(target, xml, 'utf8');
console.log(`sitemap: ${entries.length} URLs written to ${path.relative(root, target)}`);
