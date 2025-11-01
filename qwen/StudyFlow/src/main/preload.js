import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // File system operations
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  saveFile: (data, defaultPath) => ipcRenderer.invoke('save-file', data, defaultPath),
  
  // Storage operations
  store: {
    // async versions
    get: (key) => ipcRenderer.invoke('store-get', key),
    set: (key, value) => ipcRenderer.invoke('store-set', key, value),
    delete: (key) => ipcRenderer.invoke('store-delete', key),
    // sync versions to support existing synchronous service APIs
    getSync: (key) => ipcRenderer.sendSync('store-get-sync', key),
    setSync: (key, value) => ipcRenderer.sendSync('store-set-sync', key, value),
    deleteSync: (key) => ipcRenderer.sendSync('store-delete-sync', key),
  },
  
  // Other utilities can be added here
  path: {
    join: (...paths) => ipcRenderer.invoke('path-join', ...paths),
  }
});
