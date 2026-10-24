const fs = require('fs');
const path = require('path');

function readEnvFile(dir) {
  const envPath = path.join(dir, '.env');
  if (fs.existsSync(envPath)) {
    return fs.readFileSync(envPath, 'utf8');
  }
  return null;
}

function readJsonConfigs(dir) {
  const configDir = path.join(dir, 'config');
  const out = {};
  if (fs.existsSync(configDir)) {
    for (const f of fs.readdirSync(configDir)) {
      if (f.endsWith('.json')) {
        out[f] = JSON.parse(fs.readFileSync(path.join(configDir, f), 'utf8'));
      }
    }
  }
  return out;
}

function snapshot(dir) {
  return {
    tool: 'env-doctor',
    version: '1.2.0',
    envFile: readEnvFile(dir),
    jsonConfigs: readJsonConfigs(dir),
    processEnvKeys: Object.keys(process.env).filter((k) => !k.startsWith('npm_')),
  };
}

module.exports = { snapshot };

if (require.main === module) {
  const snap = snapshot(process.cwd());
  console.log('✔ env-doctor 1.2.0');
  console.log('✔ Config Snapshot generated from local environment');
  console.log(JSON.stringify(snap, null, 2));
}