const { ipcRenderer, remote } = window.require('electron');

export const openFolder = (callback?: Function, errCallback?: Function) => {
    return new Promise(resolve => {
        ipcRenderer.send('open-folder-dialog');
        ipcRenderer.on('selected-file', (event: any, files: Array<string>) => {
            if (callback) {
                callback(files);
            }
            resolve(files);
        });
        ipcRenderer.on('selected-file-error', (event: any) => {
            if (errCallback) {
                errCallback();
            }
            resolve(null);
        })
    });
};

export const createProject = (callback?: Function) => {
    return new Promise(resolve => {
        ipcRenderer.send('create-project');
        ipcRenderer.on('create-project-status', (event: any, status: string) => {
            if (callback) {
                callback(status);
            }
            resolve(status);
        });
    });
};

export const openProjectWindow = () => {
    const currentWindow = remote.getCurrentWindow();
    const url = currentWindow.webContents.getURL();
    console.log(url.concat('project'));
    const BrowserWindow = remote.BrowserWindow;
    const projectWindow = new BrowserWindow({
        show: false,
        backgroundColor: '#2e2e2e',
        width: 1280, 
        height: 720,
        title: 'Project Window',
        webPreferences: {
        nodeIntegration: true
        }
    });
    projectWindow.loadURL(url.concat('project'));
    projectWindow.once('ready-to-show', () => {
        projectWindow.show();
    });
};

const closeWindow = () => {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.close();
}

export const createMenu = (context: any) => {
    const { Menu } = remote;
    const menu = Menu.buildFromTemplate([
        {
            label: 'jam.io',
            submenu: [
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: closeWindow
                }
            ]
        },
        {
            label: 'Projects',
            submenu: [
                {
                    label: 'New Project',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        createProject(context.onProjectCreated);
                    }
                },
                {
                    label: 'Open Folder',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        openFolder(context.onFolderLoaded, context.onFolderError);
                    }
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Close Window',
                    accelerator: 'CmdOrCtrl+W',
                    click: closeWindow
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
}