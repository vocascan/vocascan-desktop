const handlerFiles = [
  "./about.js",
  "./clipboard.js",
  "./fileOperations.js",
  "./updater.js",
];

const RegisterIpcHandlers = () => {
  for (const filePath of handlerFiles) {
    require(filePath)();
  }
};

module.exports = {
  RegisterIpcHandlers,
};
