import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import Store from 'electron-store';

// Check if running in development mode
const isDev = !app.isPackaged;

// Initialize electron-store
const store = new Store({
  name: 'studyflow-data',
  defaults: {
    users: [],
    plans: [],
    settings: {
      theme: 'light',
      language: 'tr',
    },
  },
});

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'StudyFlow',
    autoHideMenuBar: !isDev,
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = await readFile(filePath, 'utf-8');
    return { success: true, data: content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-file', async (event, filePath, content) => {
  try {
    await writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('open-file-dialog', async () => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-file-dialog', async (event, defaultPath) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath,
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Storage IPC Handlers
ipcMain.handle('store-get', async (event, key) => {
  try {
    return store.get(key);
  } catch (error) {
    console.error('Store get error:', error);
    return undefined;
  }
});

ipcMain.handle('store-set', async (event, key, value) => {
  try {
    store.set(key, value);
    return true;
  } catch (error) {
    console.error('Store set error:', error);
    return false;
  }
});

ipcMain.handle('store-delete', async (event, key) => {
  try {
    store.delete(key);
    return true;
  } catch (error) {
    console.error('Store delete error:', error);
    return false;
  }
});

ipcMain.handle('store-has', async (event, key) => {
  try {
    return store.has(key);
  } catch (error) {
    console.error('Store has error:', error);
    return false;
  }
});

ipcMain.handle('store-clear', async () => {
  try {
    store.clear();
    return true;
  } catch (error) {
    console.error('Store clear error:', error);
    return false;
  }
});

ipcMain.handle('store-get-all', async () => {
  try {
    return store.store;
  } catch (error) {
    console.error('Store get-all error:', error);
    return {};
  }
});
