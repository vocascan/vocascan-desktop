const { ipcRenderer, contextBridge } = require("electron");

const electron = {
  ipcRenderer: {
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    on(channel, listener) {
      ipcRenderer.on(channel, listener);
      return this;
    },
    removeListener(channel, listener) {
      ipcRenderer.removeListener(channel, listener);
      return this;
    },
  },
};

contextBridge.exposeInMainWorld("electron", electron);

// used for react-touchbar-electron
contextBridge.exposeInMainWorld("require", (name) => {
  if (name === "electron") {
    return electron;
  }
});
