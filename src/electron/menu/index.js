const { shell, ipcMain } = require('electron');

const {
  DOCUMENTATION_URL,
  ORGANIZATION_URL,
  DISCUSSION_URL,
  ISSUES_URL,
  IS_MAC,
} = require('../../utils/constants');

const SEPARATOR_ENTRY = () => ({ type: 'separator' });

const LINK_ENTRY = (label, url) => ({
  label,
  click: async () => {
    await shell.openExternal(url);
  },
});

const IPC_ENTRY = (label, event) => ({
  label,
  click: () => {
    ipcMain.emit(event);
  },
});

const getMenuTemplate = () => {
  const MENU_TEMPLATE = [
    ...(IS_MAC
      ? [
          { role: 'appMenu', label: 'Vocascan' },
          {
            label: 'Edit',
            submenu: [
              { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
              {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                selector: 'redo:',
              },
              SEPARATOR_ENTRY(),
              { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
              { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
              {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:',
              },
              {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                selector: 'selectAll:',
              },
            ],
          },
        ]
      : []),
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        SEPARATOR_ENTRY(),
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        SEPARATOR_ENTRY(),
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        LINK_ENTRY('Documentation', DOCUMENTATION_URL),
        LINK_ENTRY('Learn More', ORGANIZATION_URL),
        LINK_ENTRY('Community Discussions', DISCUSSION_URL),
        LINK_ENTRY('Search Issues', ISSUES_URL),
        SEPARATOR_ENTRY(),
        IPC_ENTRY('Check for updates', 'checkForUpdates'),
        SEPARATOR_ENTRY(),
        IPC_ENTRY('About', 'openAbout'),
      ],
    },
  ];

  return MENU_TEMPLATE;
};

module.exports = {
  getMenuTemplate,
};
