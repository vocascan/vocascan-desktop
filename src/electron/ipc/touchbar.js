const { decorateWindow } = require("react-touchbar-electron/decorate-window");

const registerIpcHandlers = ({ windows }) => {
  decorateWindow(windows.main);
};

module.exports = registerIpcHandlers;
