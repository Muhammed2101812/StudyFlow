"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  // File system operations
  readFile: (filePath) => electron.ipcRenderer.invoke("read-file", filePath),
  saveFile: (data, defaultPath) => electron.ipcRenderer.invoke("save-file", data, defaultPath),
  // Storage operations
  store: {
    // async versions
    get: (key) => electron.ipcRenderer.invoke("store-get", key),
    set: (key, value) => electron.ipcRenderer.invoke("store-set", key, value),
    delete: (key) => electron.ipcRenderer.invoke("store-delete", key),
    // sync versions to support existing synchronous service APIs
    getSync: (key) => electron.ipcRenderer.sendSync("store-get-sync", key),
    setSync: (key, value) => electron.ipcRenderer.sendSync("store-set-sync", key, value),
    deleteSync: (key) => electron.ipcRenderer.sendSync("store-delete-sync", key)
  },
  // Other utilities can be added here
  path: {
    join: (...paths) => electron.ipcRenderer.invoke("path-join", ...paths)
  }
});
