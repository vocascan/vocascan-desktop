const { ipcRenderer, contextBridge } = require("electron");

const translations = new Promise((resolve) => {
  ipcRenderer.on("translations", (_event, translations) => {
    resolve(translations);
  });
});

contextBridge.exposeInMainWorld("t", translations);
contextBridge.exposeInMainWorld("update", {
  skip: () => ipcRenderer.send("skip-check"),
  on: (...args) => ipcRenderer.on(...args),
});
