// Pushes the WhatsApp agent's system prompt into n8n from the files in this repo.
//
// The website agent (ElevenLabs) and the WhatsApp agent (n8n + GREEN API) are two
// different engines that must never disagree about a price. This repo is the single source
// of truth for both:
//
//   src/data/training.ts
//        -> scripts/build-agent-knowledge.mjs -> agent/knowledge/*.md
//             -> scripts/create-avc-agent.mjs      (website voice agent)
//             -> scripts/sync-whatsapp-agent.mjs   (this file, WhatsApp agent)
//
// Change a price in one place, run both scripts, and both agents move together. That is
// the whole point: this project already shipped a bug where two price lists disagreed by
// GBP 50, and hand copying prices into an n8n system prompt would reintroduce it.
//
// Usage:
//   node scripts/sync-whatsapp-agent.mjs --dry-run   assemble and print, call nothing
//   node scripts/sync-whatsapp-agent.mjs             assemble and push to n8n
//
// Needs in create-3d-website/.env:
//   N8N_BASE_URL=https://n8n.indoorgrowguides.com
//   N8N_API_KEY=...          (n8n > Settings > API)

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env');

const WORKFLOW_ID = 'Z4rUk28zcT9vrdu5';
const AGENT_NODE = 'AI Vision Assistant';

const dryRun = process.argv.includes('--dry-run');

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

// The prompt and knowledge files carry HTML comments explaining themselves to whoever edits
// them next. Those are notes for humans and would only waste the model's context.
const stripComments = (text) => text.replace(/<!--[\s\S]*?-->/g, '').trim();

// n8n treats {{ ... }} inside a system message as an expression to evaluate. The runtime
// block below uses that deliberately; anything else would blow up at execution time with a
// confusing error, so catch it here instead.
function assertNoStrayExpressions(label, text) {
  if (text.includes('{{')) {
    throw new Error(
      `${label} contains "{{", which n8n would try to evaluate as an expression. `
      + 'Remove it or escape it before syncing.',
    );
  }
}

// Injected by the Prep Context node. Without the date the model guesses the year, searches
// the calendar in the wrong one, finds nothing, and tells people Eric has no availability.
const RUNTIME_BLOCK = `RUNTIME CONTEXT

Today's date is {{ $json.todayIso }}. Trust this over anything you think you know about the
date, and work out every relative date from it. Send ISO dates to the tools. Never send a
date in the past.

The incoming message type is {{ $json.msgType }}. When it is "audio", your reply will be
read aloud in Eric's voice, so follow the voice note rules below.`;

async function buildSystemMessage() {
  const promptRaw = await readFile(join(root, 'agent', 'whatsapp-prompt.md'), 'utf8');
  const prompt = stripComments(promptRaw);
  assertNoStrayExpressions('agent/whatsapp-prompt.md', prompt);

  const knowledgeDir = join(root, 'agent', 'knowledge');
  const files = (await readdir(knowledgeDir)).filter((f) => f.endsWith('.md')).sort();
  if (files.length === 0) {
    throw new Error('No knowledge documents. Run: node scripts/build-agent-knowledge.mjs');
  }

  const parts = [];
  for (const file of files) {
    const body = stripComments(await readFile(join(knowledgeDir, file), 'utf8'));
    assertNoStrayExpressions(`agent/knowledge/${file}`, body);
    parts.push(body);
  }

  const knowledge = [
    '===== KNOWLEDGE =====',
    '',
    'Everything below is generated from the website\'s own data. It is the only source of',
    'facts you may state. If something is not here, you do not know it.',
    '',
    parts.join('\n\n---\n\n'),
  ].join('\n');

  // Leading "=" is what marks a field as an n8n expression.
  return `=${RUNTIME_BLOCK}\n\n${prompt}\n\n${knowledge}\n`;
}

async function api(base, key, path, { method = 'GET', json } = {}) {
  const headers = { 'X-N8N-API-KEY': key };
  let body;
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  }
  const response = await fetch(`${base}/api/v1${path}`, { method, headers, body });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${method} ${path} failed: HTTP ${response.status}\n${text}`);
  }
  return text ? JSON.parse(text) : {};
}

async function main() {
  const systemMessage = await buildSystemMessage();

  if (dryRun) {
    const out = join(root, 'agent', '.whatsapp-system-prompt.txt');
    await writeFile(out, systemMessage, 'utf8');
    console.log(`assembled ${systemMessage.length} characters`);
    console.log(`written to agent/.whatsapp-system-prompt.txt for review`);
    console.log('dry run, nothing pushed.');
    return;
  }

  if (!existsSync(envPath)) throw new Error('create-3d-website/.env not found.');
  const env = await readFile(envPath, 'utf8');
  const base = (readEnvValue(env, 'N8N_BASE_URL') || '').replace(/\/+$/, '');
  const key = readEnvValue(env, 'N8N_API_KEY');
  if (!base || !key) {
    throw new Error('Set N8N_BASE_URL and N8N_API_KEY in create-3d-website/.env');
  }

  const workflow = await api(base, key, `/workflows/${WORKFLOW_ID}`);
  const node = workflow.nodes.find((n) => n.name === AGENT_NODE);
  if (!node) throw new Error(`No node named "${AGENT_NODE}" in workflow ${WORKFLOW_ID}`);

  if (node.parameters?.options?.systemMessage === systemMessage) {
    console.log('already up to date, nothing to push.');
    return;
  }

  node.parameters = node.parameters ?? {};
  node.parameters.options = { ...(node.parameters.options ?? {}), systemMessage };

  // The n8n public API rejects read-only fields, so send only what it accepts.
  await api(base, key, `/workflows/${WORKFLOW_ID}`, {
    method: 'PUT',
    json: {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings: workflow.settings ?? {},
    },
  });

  console.log(`pushed ${systemMessage.length} characters to ${AGENT_NODE} (${WORKFLOW_ID})`);
  console.log('note: n8n serves the saved version immediately, no reactivation needed.');
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
