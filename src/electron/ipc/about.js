const os = require("os");
const { ipcMain, app, dialog, clipboard } = require("electron");
const i18n = require("i18next");

const { metadata } = require("../../../package.json");
const { dayDateDiff } = require("../../utils/utils");

const getVersionString = () => {
  let dateString = "unknown";

  if (metadata.date && !isNaN(new Date(metadata.date))) {
    const jsDate = new Date(metadata.date);
    dateString = `${jsDate.toISOString()} (${dayDateDiff(
      jsDate,
      new Date()
    )} days ago)`;
  }

  const versionString = `
        Version: ${app.getVersion()} (#${metadata.runNumber}-${metadata.runId})
        Commit: ${metadata.commit || "unknown"}
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

  ipcMain.handle("getVersions", () => ({
    version: app.getVersion(),
    ...metadata,
    versions: {
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      nodeJS: process.versions.node,
      v8: process.versions.v8,
      os: `${os.type()} ${os.arch()} ${os.release()}`,
    },
  }));
};

module.exports = registerIpcHandlers;
