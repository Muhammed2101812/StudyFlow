import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) =>
    ipcRenderer.invoke('write-file', filePath, content),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  saveFileDialog: (defaultPath) =>
    ipcRenderer.invoke('save-file-dialog', defaultPath),

  // Storage operations
  store: {
    get: (key) => ipcRenderer.invoke('store-get', key),
    set: (key, value) => ipcRenderer.invoke('store-set', key, value),
    delete: (key) => ipcRenderer.invoke('store-delete', key),
    has: (key) => ipcRenderer.invoke('store-has', key),
    clear: () => ipcRenderer.invoke('store-clear'),
    getAll: () => ipcRenderer.invoke('store-get-all'),
  },
});
