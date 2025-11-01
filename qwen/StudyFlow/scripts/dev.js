import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Spawn the Vite dev server using the local installation
const vite = spawn('node', ['./node_modules/.bin/vite'], {
  cwd: join(__dirname, '..'),
  stdio: 'inherit'
});

// Wait a bit for the Vite server to start, then spawn Electron
setTimeout(() => {
  const electron = spawn('node', ['./node_modules/.bin/electron', '.'], {
    cwd: join(__dirname, '..'),
    stdio: 'inherit',
    env: { ...process.env, ELECTRON_ENV: 'dev' }
  });

  electron.on('close', (code) => {
    console.log(`Electron process exited with code ${code}`);
    vite.kill();
  });
}, 2000);

vite.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
});