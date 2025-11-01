import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import { fileURLToPath } from 'url';

// ESM ortamında __dirname/__filename hesapla
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import storage from './storage.js';

let mainWindow;

function createWindow() {
  // Resolve preload path for both dev (src) and built (dist-electron)
  const preloadJs = path.join(__dirname, 'preload.js');
  const preloadMjs = path.join(__dirname, 'preload.mjs');
  // Prefer MJS if both exist, as it contains up-to-date exports in dev
  const preloadPath = fs.existsSync(preloadMjs)
    ? preloadMjs
    : (fs.existsSync(preloadJs) ? preloadJs : preloadMjs);

  mainWindow = new BrowserWindow({
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath,
    },
    resizable: true,
    icon: path.join(__dirname, '../public/icon.png'),
    width: 1280,
    minHeight: 768,
    minWidth: 1024,
  });

  if (app.isPackaged) {
    // In production, Vite outputs renderer to `dist/index.html`
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:5173');
    
    // Development: Open DevTools automatically
    mainWindow.webContents.openDevTools();
  }
}

// Create a basic menu
const menuTemplate = [
  {
    label: 'Application',
    submenu: [
      { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    ]
  }
];

// IPC Handlers
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
});

ipcMain.handle('save-file', async (event, data, defaultPath) => {
  try {
    fs.writeFileSync(defaultPath, data);
    return true;
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
});

// Storage operations
ipcMain.handle('store-get', async (event, key) => {
  return storage.get(key);
});

ipcMain.handle('store-set', async (event, key, value) => {
  storage.set(key, value);
  return true;
});

ipcMain.handle('store-delete', async (event, key) => {
  storage.delete(key);
  return true;
});

// Synchronous storage operations (to support existing synchronous renderer usage)
ipcMain.on('store-get-sync', (event, key) => {
  event.returnValue = storage.get(key);
});

ipcMain.on('store-set-sync', (event, key, value) => {
  storage.set(key, value);
  event.returnValue = true;
});

ipcMain.on('store-delete-sync', (event, key) => {
  storage.delete(key);
  event.returnValue = true;
});

// Path operations
ipcMain.handle('path-join', async (event, ...paths) => {
  return path.join(...paths);
});

app.whenReady().then(() => {
  // Set the app menu
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
