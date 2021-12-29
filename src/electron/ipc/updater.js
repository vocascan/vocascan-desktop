const { ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");

const registerIpcHandlers = () => {
  ipcMain.on("checkForUpdates", () => {
    autoUpdater.checkForUpdates();
  });
};

module.exports = registerIpcHandlers;
