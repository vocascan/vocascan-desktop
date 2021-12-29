const { shell, ipcMain } = require('electron');
const { t } = require('i18next');

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
              {
                label: t('menu.edit.submenu.undo'),
                accelerator: 'CmdOrCtrl+Z',
                selector: 'undo:',
              },
              {
                label: t('menu.edit.submenu.redo'),
                accelerator: 'Shift+CmdOrCtrl+Z',
                selector: 'redo:',
              },
              SEPARATOR_ENTRY(),
              {
                label: t('menu.edit.submenu.cut'),
                accelerator: 'CmdOrCtrl+X',
                selector: 'cut:',
              },
              {
                label: t('menu.edit.submenu.copy'),
                accelerator: 'CmdOrCtrl+C',
                selector: 'copy:',
              },
              {
                label: t('menu.edit.submenu.paste'),
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:',
              },
              {
                label: t('menu.edit.submenu.selectAll'),
                accelerator: 'CmdOrCtrl+A',
                selector: 'selectAll:',
              },
            ],
          },
        ]
      : []),
    {
      label: t('menu.view.label'),
      submenu: [
        { label: t('menu.view.submenu.reload'), role: 'reload' },
        { label: t('menu.view.submenu.forceReload'), role: 'forceReload' },
        {
          label: t('menu.view.submenu.toggleDevTools'),
          role: 'toggleDevTools',
        },
        SEPARATOR_ENTRY(),
        { label: t('menu.view.submenu.actualSize'), role: 'resetZoom' },
        { label: t('menu.view.submenu.zoomIn'), role: 'zoomIn' },
        { label: t('menu.view.submenu.zoomOut'), role: 'zoomOut' },
        SEPARATOR_ENTRY(),
        {
          label: t('menu.view.submenu.toggleFullScreen'),
          role: 'togglefullscreen',
        },
      ],
    },
    {
      label: t('menu.help.label'),
      submenu: [
        LINK_ENTRY(t('menu.help.submenu.documentation'), DOCUMENTATION_URL),
        LINK_ENTRY(t('menu.help.submenu.learnMore'), ORGANIZATION_URL),
        LINK_ENTRY(t('menu.help.submenu.communityDiscussions'), DISCUSSION_URL),
        LINK_ENTRY(t('menu.help.submenu.searchIssues'), ISSUES_URL),
        SEPARATOR_ENTRY(),
        IPC_ENTRY(t('menu.help.submenu.checkForUpdates'), 'checkForUpdates'),
        SEPARATOR_ENTRY(),
        IPC_ENTRY(t('menu.help.submenu.about'), 'openAbout'),
      ],
    },
  ];

  return MENU_TEMPLATE;
};

module.exports = {
  getMenuTemplate,
};
