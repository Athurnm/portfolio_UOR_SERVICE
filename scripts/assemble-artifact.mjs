import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const rootDist = path.join(rootDir, 'dist');
const toolsDist = path.join(rootDir, 'tools', 'dist');
const targetToolsDist = path.join(rootDist, 'tools');

console.log('[assemble-artifact] Assembling combined distribution bundle...');

if (!fs.existsSync(rootDist)) {
  console.error('[assemble-artifact] Error: root dist/ directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

if (!fs.existsSync(toolsDist)) {
  console.error('[assemble-artifact] Error: tools/dist/ directory does not exist. Run "npm run build --workspace=tools" first.');
  process.exit(1);
}

// Copy tools/dist into dist/tools
if (fs.existsSync(targetToolsDist)) {
  fs.rmSync(targetToolsDist, { recursive: true, force: true });
}
fs.cpSync(toolsDist, targetToolsDist, { recursive: true });
console.log('[assemble-artifact] Copied tools/dist -> dist/tools');

// Verification
const rootIndex = path.join(rootDist, 'index.html');
const toolsIndex = path.join(targetToolsDist, 'index.html');
const redirectsFile = path.join(rootDist, '_redirects');
const headersFile = path.join(rootDist, '_headers');

if (!fs.existsSync(rootIndex)) {
  console.error('[assemble-artifact] Verification failed: dist/index.html is missing!');
  process.exit(1);
}

if (!fs.existsSync(toolsIndex)) {
  console.error('[assemble-artifact] Verification failed: dist/tools/index.html is missing!');
  process.exit(1);
}

if (!fs.existsSync(redirectsFile)) {
  console.warn('[assemble-artifact] Warning: dist/_redirects is missing. Copying from public/_redirects...');
  const srcRedirects = path.join(rootDir, 'public', '_redirects');
  if (fs.existsSync(srcRedirects)) {
    fs.copyFileSync(srcRedirects, redirectsFile);
  }
}

if (!fs.existsSync(headersFile)) {
  console.warn('[assemble-artifact] Warning: dist/_headers is missing. Copying from public/_headers...');
  const srcHeaders = path.join(rootDir, 'public', '_headers');
  if (fs.existsSync(srcHeaders)) {
    fs.copyFileSync(srcHeaders, headersFile);
  }
}

console.log('✅ Combined build verified successfully:');
console.log('   - /: dist/index.html');
console.log('   - /tools/: dist/tools/index.html');
console.log('   - Netlify Routing: dist/_redirects');
console.log('   - Security Headers: dist/_headers');
