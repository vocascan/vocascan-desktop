const os = require("os");
const { ipcMain, app, dialog, clipboard } = require("electron");
const i18n = require("i18next");

const { commit, date } = require("../../../package.json");
const { dayDateDiff } = require("../../utils/utils");

const getVersionString = () => {
  let dateString = "unknown";

  if (date && !isNaN(new Date(date))) {
    const jsDate = new Date(date);
    dateString = `${jsDate.toISOString()} (${dayDateDiff(
      jsDate,
      new Date()
    )} days ago)`;
  }

  const versionString = `
        Version: ${app.getVersion()}
        Commit: ${commit || "unknown"}
        Date: ${dateString}
        Electron: ${process.versions.electron}
        Chrome: ${process.versions.chrome}
        Node.js: ${process.versions.node}
        V8: ${process.versions.v8}
        OS: ${os.type()} ${os.arch()} ${os.release()}
      `;

  return versionString;
};

const registerIpcHandlers = () => {
  ipcMain.on("openAbout", async () => {
    const versionString = getVersionString();

    const { response } = await dialog.showMessageBox({
      type: "info",
      title: "Vocascan",
      message: versionString,
      noLink: true,
      buttons: [i18n.t("dialogs.actions.ok"), i18n.t("dialogs.actions.copy")],
    });

    if (response === 1) {
      clipboard.writeText(versionString);
    }
  });
};

module.exports = registerIpcHandlers;
