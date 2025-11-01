"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  readFile: (filePath) => electron.ipcRenderer.invoke("read-file", filePath),
  writeFile: (filePath, content) => electron.ipcRenderer.invoke("write-file", filePath, content),
  openFileDialog: () => electron.ipcRenderer.invoke("open-file-dialog"),
  saveFileDialog: (defaultPath) => electron.ipcRenderer.invoke("save-file-dialog", defaultPath)
});
