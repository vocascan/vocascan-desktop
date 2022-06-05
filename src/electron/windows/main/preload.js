const { ipcRenderer, contextBridge } = require("electron");
const { preload } = require("@luwol03/react-touchbar-electron/preload");

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

preload();
