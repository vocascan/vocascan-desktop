const { ipcMain, clipboard } = require("electron");

const registerIpcHandlers = () => {
  ipcMain.handle("copy-to-clip", async (_event, arg) => {
    clipboard.writeText(arg.text);
  });
};

module.exports = registerIpcHandlers;
