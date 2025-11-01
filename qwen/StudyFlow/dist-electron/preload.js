"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  // File system operations
  readFile: (filePath) => electron.ipcRenderer.invoke("read-file", filePath),
  saveFile: (data, defaultPath) => electron.ipcRenderer.invoke("save-file", data, defaultPath),
  // Storage operations
  store: {
    get: (key) => electron.ipcRenderer.invoke("store-get", key),
    set: (key, value) => electron.ipcRenderer.invoke("store-set", key, value),
    delete: (key) => electron.ipcRenderer.invoke("store-delete", key)
  },
  // Other utilities can be added here
  path: {
    join: (...paths) => electron.ipcRenderer.invoke("path-join", ...paths)
  }
});
