// Creates or updates the ElevenLabs voice agent from files in this repo.
//
// The agent is never configured by hand in the dashboard. Everything it is comes from
// agent/avc-agent-prompt.md and agent/knowledge/*.md, so the live agent can always be
// rebuilt from a commit. Re-running is safe: existing ids in agent/agent-ids.json are
// updated in place rather than creating duplicates.
//
// Usage:
//   node scripts/create-avc-agent.mjs            create or update
//   node scripts/create-avc-agent.mjs --dry-run  print the payload, call nothing
//   node scripts/create-avc-agent.mjs --reupload re-upload knowledge docs from scratch

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const API = 'https://api.elevenlabs.io';

const AGENT_NAME = 'Joe — AI Vision Consulting';
const VOICE_ID = 'FVsSqJuAtHOX7s21yLpE'; // "Best Voice", Eric's professional voice clone

// Creator plan gives 275 agent minutes a month. A four minute ceiling keeps a runaway or
// abandoned call from eating the budget; see agent/README.md for the arithmetic.
const MAX_CALL_SECONDS = 240;

const ALLOWED_HOSTS = [
  'aivisionconsulting.co.uk',
  'www.aivisionconsulting.co.uk',
  'localhost:5173',
];

// The opener is pinned here rather than left to the model, so the "I am an AI" disclosure
// is guaranteed on every single call instead of being probabilistic. The voice is a clone
// of Eric's, so this is the one line that must never be skipped.
const FIRST_MESSAGE =
  "Hi, you're through to AI Vision Consulting. I'm Joe, an AI assistant, not a real person. "
  + 'I can talk you through the training, the prices, or get you booked in with Eric. '
  + 'What brings you here today?';

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const reupload = args.has('--reupload');

const idsPath = join(root, 'agent', 'agent-ids.json');
const envPath = join(root, '.env');

function readEnvValue(text, key) {
  for (const line of text.split(/\r?\n/)) {
    if (line.trimStart().startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    if (line.slice(0, eq).trim() !== key) continue;
    return line.slice(eq + 1).trim();
  }
  return '';
}

async function loadKey() {
  if (!existsSync(envPath)) throw new Error('create-3d-website/.env not found.');
  const key = readEnvValue(await readFile(envPath, 'utf8'), 'ELEVENLABS_API_KEY');
  if (!key) throw new Error('ELEVENLABS_API_KEY is empty in create-3d-website/.env');
  return key;
}

// Every failure prints the status and the response body verbatim. A voice agent that fails
// silently at build time fails loudly in front of a customer instead.
async function call(key, path, { method = 'GET', json, form } = {}) {
  const headers = { 'xi-api-key': key };
  let body;
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  } else if (form !== undefined) {
    body = form;
  }

  const response = await fetch(`${API}${path}`, { method, headers, body });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${method} ${path} failed: HTTP ${response.status}\n${text}`);
  }
  return text ? JSON.parse(text) : {};
}

async function loadIds() {
  if (!existsSync(idsPath)) return { knowledge: {}, agentId: '' };
  return JSON.parse(await readFile(idsPath, 'utf8'));
}

async function uploadKnowledge(key, ids) {
  const dir = join(root, 'agent', 'knowledge');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md')).sort();
  if (files.length === 0) {
    throw new Error('No knowledge documents. Run: node scripts/build-agent-knowledge.mjs');
  }

  const attached = [];
  for (const file of files) {
    const docName = `AVC ${basename(file, '.md')}`;
    const existing = ids.knowledge[file];

    if (existing && !reupload) {
      console.log(`  reusing ${file} -> ${existing}`);
      attached.push({ type: 'file', name: docName, id: existing, usage_mode: 'prompt' });
      continue;
    }

    const contents = await readFile(join(dir, file));
    const form = new FormData();
    form.append('file', new Blob([contents], { type: 'text/markdown' }), file);
    form.append('name', docName);

    const result = await call(key, '/v1/convai/knowledge-base/file', { method: 'POST', form });
    ids.knowledge[file] = result.id;
    console.log(`  uploaded ${file} -> ${result.id}`);
    attached.push({ type: 'file', name: docName, id: result.id, usage_mode: 'prompt' });
  }
  return attached;
}

// usage_mode 'prompt' puts every document in full context rather than retrieving chunks.
// The whole knowledge base is about 13 KB, and for an agent quoting prices, full context
// beats RAG: a retrieval miss on a price is worse than the tokens cost.
function buildConfig(prompt, knowledge) {
  return {
    name: AGENT_NAME,
    conversation_config: {
      agent: {
        first_message: FIRST_MESSAGE,
        language: 'en',
        prompt: {
          prompt,
          knowledge_base: knowledge,
        },
      },
      tts: {
        voice_id: VOICE_ID,
      },
      conversation: {
        max_duration_seconds: MAX_CALL_SECONDS,
      },
    },
    platform_settings: {
      auth: {
        // The embedded widget needs a public agent. The allowlist is what keeps it from
        // being run up on someone else's site at Eric's expense.
        enable_auth: false,
        allowlist: ALLOWED_HOSTS.map((hostname) => ({ hostname })),
      },
    },
  };
}

async function main() {
  const key = await loadKey();
  const prompt = await readFile(join(root, 'agent', 'avc-agent-prompt.md'), 'utf8');
  const ids = await loadIds();

  console.log('knowledge base:');
  const knowledge = dryRun ? [] : await uploadKnowledge(key, ids);

  const config = buildConfig(prompt, knowledge);

  if (dryRun) {
    console.log(JSON.stringify(config, null, 2));
    return;
  }

  let agentId = ids.agentId;
  if (agentId) {
    await call(key, `/v1/convai/agents/${agentId}`, { method: 'PATCH', json: config });
    console.log(`updated agent ${agentId}`);
  } else {
    const created = await call(key, '/v1/convai/agents/create', { method: 'POST', json: config });
    agentId = created.agent_id ?? created.id;
    console.log(`created agent ${agentId}`);
  }

  ids.agentId = agentId;
  await writeFile(idsPath, `${JSON.stringify(ids, null, 2)}\n`, 'utf8');

  // Publish the agent id to the browser bundle. It is not a secret; the public key model
  // is what protects the agent, together with the allowlist above.
  const envText = await readFile(envPath, 'utf8');
  const updated = envText.replace(
    /^VITE_ELEVENLABS_AGENT_ID=.*$/m,
    `VITE_ELEVENLABS_AGENT_ID=${agentId}`,
  );
  await writeFile(envPath, updated, 'utf8');
  console.log('wrote VITE_ELEVENLABS_AGENT_ID to .env');
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
