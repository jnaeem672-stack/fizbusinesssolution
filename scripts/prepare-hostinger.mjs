import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const standaloneDir = path.join(root, '.next', 'standalone');
const deployDir = path.join(root, 'hostinger-deploy');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

if (!fs.existsSync(standaloneDir)) {
  console.error('Standalone build not found. Run "npm run build" first.');
  process.exit(1);
}

removeDir(deployDir);
fs.mkdirSync(deployDir, { recursive: true });

copyDir(standaloneDir, deployDir);
copyDir(path.join(root, 'public'), path.join(deployDir, 'public'));
copyDir(path.join(root, '.next', 'static'), path.join(deployDir, '.next', 'static'));

fs.writeFileSync(
  path.join(deployDir, 'HOSTINGER.txt'),
  [
    'FizBussinessSolution — Hostinger deploy package',
    '',
    '1. Upload ALL files in this folder to your Hostinger Node.js app directory.',
    '2. In hPanel → Websites → Node.js → set:',
    '   - Application startup file: server.js',
    '   - Application mode: Production',
    '3. Run "npm install --omit=dev" on the server if needed.',
    '4. Start / restart the Node.js application.',
    '',
    'Git auto-deploy settings (optional):',
    '   Install: npm install',
    '   Build:   npm run build:hostinger',
    '   Start:   node server.js',
    '',
  ].join('\n')
);

console.log(`Hostinger deploy package ready: ${deployDir}`);
