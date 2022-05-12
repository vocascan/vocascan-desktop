const { TouchBar, ipcMain } = require("electron");
const { getBrowserWindowFromEvent } = require("../../utils/utils");
const { TouchBarButton } = TouchBar;

const isTouchbarAvailable = () => process.platform === "darwin";

const registerIpcHandlers = () => {
  ipcMain.handle("touchbar:select", (e, { options }) => {
    if (!isTouchbarAvailable()) return ["NOT_SUPPORTED"];

    return new Promise((res) => {
      const buttons = options.map(
        (option) =>
          new TouchBarButton({
            label: option.label,
            accessibilityLabel: option.accessibilityLabel,
            backgroundColor: option.backgroundColor,
            click: () => res([null, option]),
          })
      );

      const touchBar = new TouchBar({
        items: buttons,
      });

      const win = getBrowserWindowFromEvent(e);
      win.setTouchBar(touchBar);
    });
  });

  ipcMain.handle("touchbar:reset", (e) => {
    if (!isTouchbarAvailable()) return ["NOT_SUPPORTED"];

    const win = getBrowserWindowFromEvent(e);
    win.setTouchBar(null);
    return [null];
  });
};

module.exports = registerIpcHandlers;
