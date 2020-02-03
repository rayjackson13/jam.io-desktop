const { ipcRenderer } = window.require('electron');

export const openFolder = (callback?: any, errCallback?: any) => {
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