const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ...ipcRenderer,
  on: ipcRenderer.on,
  removeListener: ipcRenderer.removeListener,
});
