const handlerFiles = [
  "./about.js",
  "./clipboard.js",
  "./fileOperations.js",
  "./updater.js",
];

const RegisterIpcHandlers = (args) => {
  for (const filePath of handlerFiles) {
    require(filePath)(args);
  }
};

module.exports = {
  RegisterIpcHandlers,
};
