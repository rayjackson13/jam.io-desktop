const { ipcRenderer } = window.require('electron');

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