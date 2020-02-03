const { ipcRenderer, remote } = window.require('electron');

declare global {
    interface Window {
        require: any
    }
}

const showMessageBox = () => {
    const { dialog } = remote;
    const currentWindow = remote.getCurrentWindow();
    dialog.showMessageBoxSync(currentWindow, {
        type: 'error',
        buttons: [ 'OK' ],
        title: 'No Project Found',
        message: 'The folder you selected doesn\'t contain a valid jam.io project.'
    })
}

export const openFolder = (errCallback?: Function) => {
    return new Promise(resolve => {
        ipcRenderer.send('open-folder-dialog');
        ipcRenderer.on('selected-file', (event: any, files: Array<string>) => {
            openProjectWindow();
            resolve(files);
        });
        ipcRenderer.on('selected-file-error', (event: any) => {
            if (errCallback) {
                errCallback();
            }

            showMessageBox();
            resolve();
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
            openProjectWindow();
            resolve(status);
        });
    });
};

export const openProjectWindow = () => {
    const currentWindow = remote.getCurrentWindow();
    const url = currentWindow.webContents.getURL();
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
    projectWindow.webContents.openDevTools();
    projectWindow.once('ready-to-show', () => {
        projectWindow.show();
        currentWindow.hide();
    });
    projectWindow.on('closed', () => {
        currentWindow.show();
    })
};

export const closeWindow = () => {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.close();
};