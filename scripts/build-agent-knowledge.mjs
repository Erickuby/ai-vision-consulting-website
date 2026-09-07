// Regenerates the voice agent's knowledge base from the site's own data files.
//
// The agent must never hold a price that the website does not show. Every fact below is
// read out of src/data/*.ts at build time, so editing a price in one place updates the
// site and the agent together. Nothing here is hand typed.
//
// Usage:  node scripts/build-agent-knowledge.mjs
// Output: agent/knowledge/*.md   (upload these as ElevenLabs knowledge base documents)

import { build } from 'esbuild';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const outDir = join(root, 'agent', 'knowledge');
const tmpFile = join(root, 'node_modules', '.agent-data.mjs');

// Site facts that live in components rather than data files. Keep this list short; if a
// value here starts drifting, move it into src/data and read it like everything else.
const CONTACT = {
  company: 'AI Vision Consulting Ltd',
  person: 'Eric Nwankwo',
  email: 'eric.nwankwo@aivisionconsulting.co.uk',
  phone: '+447341183915',
  phoneNote: 'Call or WhatsApp',
  base: 'Newcastle upon Tyne, UK',
  coverage: 'Serving the UK, remote and in person',
  site: 'https://aivisionconsulting.co.uk',
  booking: 'https://cal.com/eric-nwankwo/ai-discovery-call',
  socials: {
    LinkedIn: 'https://www.linkedin.com/in/eric-nwankwo/',
    Instagram: 'https://www.instagram.com/aivisionconsulting/',
    Facebook: 'https://www.facebook.com/profile.php?id=61585002446584',
    YouTube: 'https://www.youtube.com/@EricExplainsAI',
    TikTok: 'https://www.tiktok.com/@aivisionconsultingltd',
  },
};

// lucide-react exports React components used only for on-page icons. The agent does not
// need them, and importing real React components into Node is pointless, so stub the
// module out during the bundle.
const stubLucide = {
  name: 'stub-lucide',
  setup(b) {
    b.onResolve({ filter: /^lucide-react$/ }, () => ({ path: 'lucide-react', namespace: 'stub' }));
    // CommonJS on purpose: esbuild resolves named imports from a CJS module at runtime,
    // so a Proxy can satisfy any icon name without listing them all.
    b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({
      contents: 'module.exports = new Proxy({}, { get: () => () => null });',
      loader: 'js',
    }));
  },
};

async function loadSiteData() {
  await build({
    stdin: {
      contents: `
        export * from '../src/data/services';
        export * from '../src/data/training';
        export * from '../src/data/routes';
      `,
      resolveDir: join(root, 'scripts'),
      loader: 'ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: tmpFile,
    plugins: [stubLucide],
    logLevel: 'silent',
  });

  try {
    return await import(`${new URL(`file://${tmpFile.replace(/\\/g, '/')}`).href}?t=${Date.now()}`);
  } finally {
    await rm(tmpFile, { force: true });
  }
}

const bullets = (items) => items.map((item) => `- ${item}`).join('\n');

function packageBlock(pkg) {
  // "From £995" means the figure is a starting point, not a fixed price. The agent is told
  // to treat these two cases differently, so mark them explicitly here.
  const fixed = !/^from/i.test(pkg.price.trim());
  return [
    `### ${pkg.name}`,
    ``,
    `- Price: ${pkg.price} (${fixed ? 'FIXED, quote this exactly' : 'STARTING PRICE, final quote depends on scope'})`,
    `- Format: ${pkg.format}`,
    `- ${pkg.description}`,
    `- Includes: ${pkg.features.join('; ')}`,
  ].join('\n');
}

function docAbout() {
  const socials = Object.entries(CONTACT.socials).map(([k, v]) => `- ${k}: ${v}`).join('\n');
  return `# About ${CONTACT.company}

${CONTACT.company} provides practical AI training and automation consulting. It is led by
${CONTACT.person} and is based in ${CONTACT.base}. ${CONTACT.coverage}.

## How to reach a human
- Email: ${CONTACT.email}
- Phone: ${CONTACT.phone} (${CONTACT.phoneNote})
- Website: ${CONTACT.site}
- Book a free discovery call: ${CONTACT.booking}

## Social channels
${socials}

## Where things are on the website
- Prices: ${CONTACT.site}/pricing/
- Course topics: ${CONTACT.site}/pricing/#catalogue-heading
- Contact form: ${CONTACT.site}/contact/
- About Eric: ${CONTACT.site}/about-eric-nwankwo/
- Case studies: ${CONTACT.site}/case-studies/
`;
}

function docServices(data) {
  const body = data.servicesData
    .map((s) => `## ${s.title}\n\n${s.description}\n\n${bullets(s.points)}`)
    .join('\n\n');
  return `# Services offered\n\n${body}\n`;
}

function docPricing(data) {
  return `# Prices

Currency is pounds sterling. Say prices the way a person says them, for example "seventy
five pounds", not "GBP 75".

## Individual one to one training
Each individual session lasts one hour. Learners can choose Practical AI topics, Microsoft
365 Copilot for Work topics, or a mix. These prices are fixed and published.

${data.individualTrainingPackages.map(packageBlock).join('\n\n')}

## Private small group
${packageBlock(data.privateGroupPackage)}

## Corporate and team training
Starting prices cover the stated group size, a scoping conversation, tailored delivery and
participant resources. Delivered remotely across the UK, or in person where suitable.

${data.corporateTrainingPackages.map(packageBlock).join('\n\n')}

## What every published price includes
- Pre session or pre programme scoping
- Training tailored to agreed goals and confidence levels
- Live demonstrations and guided practice
- Relevant slides, prompts, exercises or action notes

## What is NOT included and is quoted separately
- Software subscriptions, Microsoft licences and any AI agent usage charges
- Venue hire
- Custom tool development
- Travel beyond Newcastle
- Extra cohorts

Individual training prices are fixed. Private group and corporate figures are starting
points only; the final quote depends on audience, delivery location, preparation, group
size and any custom materials. Community and employability programmes are scoped around
cohort needs and available funding.
`;
}

function docCatalogue(data) {
  const practical = data.trainingCategories
    .map((c) => `## ${c.title}\n\n${c.strapline}\n\n${c.sessions
      .map((s) => `${s.number}. **${s.title}** — ${s.description}`)
      .join('\n')}`)
    .join('\n\n');

  const copilot = data.copilotSessions
    .map((s) => `${s.number}. **${s.title}** — ${s.description}`)
    .join('\n');

  return `# Course topics

Two routes are available. A learner can take either, or mix them across a bundle.

# Route one: Practical AI (twelve topics)

${practical}

# Route two: Microsoft 365 Copilot for Work (eight topics)

${copilot}
`;
}

function docFaq(data) {
  const seen = new Set();
  const faqs = [];
  for (const route of data.siteRoutes ?? []) {
    for (const faq of route.faqs ?? []) {
      const key = faq.question.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      faqs.push(faq);
    }
  }
  const body = faqs.map((f) => `## ${f.question}\n\n${f.answer}`).join('\n\n');
  return `# Frequently asked questions\n\nThese answers are published on the website. Prefer them over improvising.\n\n${body}\n`;
}

async function main() {
  const data = await loadSiteData();

  const docs = {
    '01-about.md': docAbout(),
    '02-services.md': docServices(data),
    '03-pricing.md': docPricing(data),
    '04-course-topics.md': docCatalogue(data),
    '05-faq.md': docFaq(data),
  };

  await mkdir(outDir, { recursive: true });
  for (const [name, contents] of Object.entries(docs)) {
    const header = `<!-- GENERATED by scripts/build-agent-knowledge.mjs. Do not edit by hand.\n`
      + `     Edit src/data/*.ts and re-run the script, then re-upload to ElevenLabs. -->\n\n`;
    await writeFile(join(outDir, name), header + contents, 'utf8');
    console.log(`wrote agent/knowledge/${name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
