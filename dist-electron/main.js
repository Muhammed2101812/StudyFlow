"use strict";
const electron = require("electron");
const path = require("path");
const promises = require("fs/promises");
const isDev = process.env.NODE_ENV === "development";
let mainWindow = null;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
    title: "StudyFlow",
    autoHideMenuBar: !isDev
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("read-file", async (event, filePath) => {
  try {
    const content = await promises.readFile(filePath, "utf-8");
    return { success: true, data: content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
electron.ipcMain.handle("write-file", async (event, filePath, content) => {
  try {
    await promises.writeFile(filePath, content, "utf-8");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
electron.ipcMain.handle("open-file-dialog", async () => {
  try {
    const result = await electron.dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      filters: [{ name: "JSON Files", extensions: ["json"] }]
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
electron.ipcMain.handle("save-file-dialog", async (event, defaultPath) => {
  try {
    const result = await electron.dialog.showSaveDialog(mainWindow, {
      defaultPath,
      filters: [{ name: "JSON Files", extensions: ["json"] }]
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
