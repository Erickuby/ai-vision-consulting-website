// Creates the agent's server tools and attaches them to the agent.
//
// Three tools: check availability, book the discovery call, capture a lead. The first two
// hit Cal.com against the SAME event type the website already links to, so voice bookings
// land in the existing n8n and Teams pipeline rather than a parallel funnel.
//
// The Cal.com key is never in this repo. It lives in the ElevenLabs workspace secrets
// manager and is referenced here only by secret id.
//
// Usage:
//   node scripts/create-avc-tools.mjs             create or update, then attach
//   node scripts/create-avc-tools.mjs --dry-run   print payloads, call nothing

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const API = 'https://api.elevenlabs.io';

const CAL_SECRET_NAME = 'CAL_API_KEY';
const CAL_USERNAME = 'eric-nwankwo';
const CAL_EVENT_SLUG = 'ai-discovery-call';
const TIMEZONE = 'Europe/London';
const LEAD_ENDPOINT = 'https://n8n.indoorgrowguides.com/webhook/avc-website-lead';

const dryRun = process.argv.includes('--dry-run');
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

async function call(key, path, { method = 'GET', json } = {}) {
  const headers = { 'xi-api-key': key };
  let body;
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  }
  const response = await fetch(`${API}${path}`, { method, headers, body });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${method} ${path} failed: HTTP ${response.status}\n${text}`);
  }
  return text ? JSON.parse(text) : {};
}

const secretRef = (secretId) => ({ type: 'secret', secret_id: secretId });
// The API rejects a property that sets both constant_value and description, so pinned
// values carry no description. The LLM never sees or fills these anyway.
const constant = (value) => ({ type: 'string', constant_value: value });

function toolConfigs(calSecretId) {
  return [
    {
      type: 'webhook',
      name: 'check_availability',
      description:
        'Look up free discovery call slots on the real calendar. Call this before offering any '
        + 'time. Never state availability without calling this first. Dates must be ISO 8601 UTC, '
        + 'for example 2026-09-10T00:00:00Z. Ask for at most a one week range at a time.',
      response_timeout_secs: 12,
      api_schema: {
        url: 'https://api.cal.com/v2/slots',
        method: 'GET',
        request_headers: {
          Authorization: secretRef(calSecretId),
          'cal-api-version': '2024-09-04',
        },
        query_params_schema: {
          properties: {
            eventTypeSlug: constant(CAL_EVENT_SLUG),
            username: constant(CAL_USERNAME),
            timeZone: constant(TIMEZONE),
            start: {
              type: 'string',
              description: 'Start of the search range, ISO 8601 UTC, e.g. 2026-09-10T00:00:00Z',
            },
            end: {
              type: 'string',
              description: 'End of the search range, ISO 8601 UTC, e.g. 2026-09-17T00:00:00Z',
            },
          },
          required: ['start', 'end'],
        },
      },
    },
    {
      type: 'webhook',
      name: 'book_discovery_call',
      description:
        'Book the free discovery call. Only call this after the caller has confirmed their name '
        + 'and email address read back to them, and after check_availability returned the slot you '
        + 'are booking. Never claim a booking succeeded until this returns successfully.',
      response_timeout_secs: 15,
      api_schema: {
        url: 'https://api.cal.com/v2/bookings',
        method: 'POST',
        content_type: 'application/json',
        request_headers: {
          Authorization: secretRef(calSecretId),
          'cal-api-version': '2024-08-13',
        },
        request_body_schema: {
          type: 'object',
          description: 'The booking to create.',
          properties: {
            eventTypeSlug: constant(CAL_EVENT_SLUG),
            username: constant(CAL_USERNAME),
            start: {
              type: 'string',
              description: 'Exact slot start returned by check_availability, ISO 8601 UTC.',
            },
            // constant_value is only injected for TOP LEVEL properties. Nested inside an
            // object it is silently dropped, which a live call proved: eventTypeSlug and
            // username arrived, attendee.timeZone and attendee.language did not. So every
            // nested value has to be described and filled by the model instead.
            attendee: {
              type: 'object',
              description: 'The person booking.',
              properties: {
                name: { type: 'string', description: 'Full name as they gave it.' },
                email: { type: 'string', description: 'Email address, confirmed back to them.' },
                timeZone: {
                  type: 'string',
                  description: 'Always exactly "Europe/London". Never any other value.',
                },
                language: { type: 'string', description: 'Always exactly "en".' },
              },
              required: ['name', 'email', 'timeZone'],
            },
            // The event type has required custom booking fields. Omitting one makes Cal.com
            // reject the whole booking with a 400, which the caller experiences as the
            // booking simply failing.
            bookingFieldsResponses: {
              type: 'object',
              description: 'Answers to the required custom booking questions.',
              properties: {
                whatsapp: {
                  type: 'string',
                  description:
                    'The caller\'s WhatsApp number in full international format, starting with a '
                    + 'plus and the country code, e.g. +447700900123 for the UK. Required.',
                },
              },
              required: ['whatsapp'],
            },
          },
          required: ['start', 'attendee', 'bookingFieldsResponses'],
        },
      },
    },
    {
      type: 'webhook',
      name: 'capture_lead',
      description:
        'Pass the caller details to Eric when they are interested but do not want to book now. '
        + 'Use this rather than promising a callback with no record. Do not mention this tool.',
      // Short timeout on purpose: the n8n host has flaky DNS and a lead capture must never
      // stall a live conversation. Losing the lead is recoverable, stalling the call is not.
      response_timeout_secs: 5,
      api_schema: {
        url: LEAD_ENDPOINT,
        method: 'POST',
        content_type: 'application/x-www-form-urlencoded',
        request_body_schema: {
          type: 'object',
          description: 'Lead details, matching the website contact form fields.',
          properties: {
            // lead_type stays "contact" so the existing n8n branch picks it up unchanged.
            // The voice origin is carried in source instead.
            lead_type: constant('contact'),
            source: constant('Voice agent (Joe)'),
            enquiryType: constant('Voice agent enquiry'),
            name: { type: 'string', description: 'Full name.' },
            email: { type: 'string', description: 'Email address, confirmed back to them.' },
            message: {
              type: 'string',
              description: 'One or two lines on what they are after, in your own words.',
            },
          },
          required: ['name', 'email', 'message'],
        },
      },
    },
  ];
}

async function main() {
  if (!existsSync(envPath)) throw new Error('create-3d-website/.env not found.');
  const key = readEnvValue(await readFile(envPath, 'utf8'), 'ELEVENLABS_API_KEY');
  if (!key) throw new Error('ELEVENLABS_API_KEY is empty.');

  const ids = JSON.parse(await readFile(idsPath, 'utf8'));
  if (!ids.agentId) throw new Error('No agentId. Run scripts/create-avc-agent.mjs first.');

  const secrets = await call(key, '/v1/convai/secrets');
  const list = secrets.secrets ?? secrets;
  const calSecret = list.find((s) => s.name === CAL_SECRET_NAME);
  if (!calSecret) {
    throw new Error(
      `No workspace secret named ${CAL_SECRET_NAME}. Add the Cal.com key in ElevenLabs `
      + 'under Agents > Settings > Secrets.',
    );
  }
  const calSecretId = calSecret.secret_id ?? calSecret.id;
  console.log(`using secret ${CAL_SECRET_NAME} (${calSecretId})`);

  const configs = toolConfigs(calSecretId);

  if (dryRun) {
    console.log(JSON.stringify(configs, null, 2));
    return;
  }

  ids.tools = ids.tools ?? {};
  const toolIds = [];

  for (const config of configs) {
    const existing = ids.tools[config.name];
    if (existing) {
      await call(key, `/v1/convai/tools/${existing}`, { method: 'PATCH', json: { tool_config: config } });
      console.log(`  updated ${config.name} -> ${existing}`);
      toolIds.push(existing);
      continue;
    }
    const created = await call(key, '/v1/convai/tools', { method: 'POST', json: { tool_config: config } });
    const toolId = created.id ?? created.tool_id;
    ids.tools[config.name] = toolId;
    console.log(`  created ${config.name} -> ${toolId}`);
    toolIds.push(toolId);
  }

  await call(key, `/v1/convai/agents/${ids.agentId}`, {
    method: 'PATCH',
    json: { conversation_config: { agent: { prompt: { tool_ids: toolIds } } } },
  });
  console.log(`attached ${toolIds.length} tools to ${ids.agentId}`);

  await writeFile(idsPath, `${JSON.stringify(ids, null, 2)}\n`, 'utf8');
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
