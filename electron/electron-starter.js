const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const url = require('url');
const path = require('path');
const { validateProject, createTempProject } = require('./helpers/projects');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600,
    title: 'jam.io',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Define content security policy.
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //     callback({ responseHeaders: Object.assign({
  //         'Content-Security-Policy': [ 'default-src 'self'' ]
  //     }, details.responseHeaders)});
  // });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('open-folder-dialog', function (event) {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
    .then(result => {
      const folders = result.filePaths;
      validateProject(folders).then(validFolder => {
        if (validFolder) {
          event.sender.send('selected-file', validFolder);
          return;
        }
        event.sender.send('selected-file-error', null);
      });
    });
});

ipcMain.on('create-project', event => {
  createTempProject()
    .then(result => {
      event.sender.send('create-project-status', result);
    })
})