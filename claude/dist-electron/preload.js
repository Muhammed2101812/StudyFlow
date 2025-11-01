"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  readFile: (filePath) => electron.ipcRenderer.invoke("read-file", filePath),
  writeFile: (filePath, content) => electron.ipcRenderer.invoke("write-file", filePath, content),
  openFileDialog: () => electron.ipcRenderer.invoke("open-file-dialog"),
  saveFileDialog: (defaultPath) => electron.ipcRenderer.invoke("save-file-dialog", defaultPath),
  // Storage operations
  store: {
    get: (key) => electron.ipcRenderer.invoke("store-get", key),
    set: (key, value) => electron.ipcRenderer.invoke("store-set", key, value),
    delete: (key) => electron.ipcRenderer.invoke("store-delete", key),
    has: (key) => electron.ipcRenderer.invoke("store-has", key),
    clear: () => electron.ipcRenderer.invoke("store-clear"),
    getAll: () => electron.ipcRenderer.invoke("store-get-all")
  }
});
