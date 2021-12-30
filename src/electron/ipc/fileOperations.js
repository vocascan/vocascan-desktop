const fs = require("fs");
const { t } = require("i18next");
const { ipcMain, dialog } = require("electron");

const registerIpcHandlers = () => {
  ipcMain.handle("save-file", async (_event, arg) => {
    await dialog
      .showSaveDialog({
        title: t("ipc.fileOperations.saveFile"),
        defaultPath: `./${arg.title}`,
        // Restricting the user to only json Files.
        filters: [
          {
            name: "JSON file",
            extensions: ["json"],
          },
        ],
        properties: [],
      })
      .then((file) => {
        if (!file.canceled) {
          // Creating and Writing to the json file
          fs.writeFile(file.filePath.toString(), arg.text, (err) => {
            if (err) throw err;
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  });

  ipcMain.handle("open-file", async () => {
    return new Promise((resolve, reject) => {
      dialog
        .showOpenDialog({
          filters: [
            {
              name: "JSON file",
              extensions: ["json"],
            },
          ],
          properties: ["openFile"],
        })
        .then((file) => {
          if (!file.canceled) {
            fs.readFile(file.filePaths[0], "utf8", (_err, data) => {
              try {
                resolve(JSON.parse(data));
              } catch (e) {
                // Catch error in case file doesn't exist or isn't valid JSON
                reject(e);
              }
            });
          }
        })
        .catch((err) => {
          throw err;
        });
    });
  });
};

module.exports = registerIpcHandlers;
