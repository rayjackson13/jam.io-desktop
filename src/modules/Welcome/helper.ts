const { ipcRenderer } = window.require('electron');

export const openFolder = (callback?: any) => {
    return new Promise(resolve => {
        ipcRenderer.send('open-folder-dialog');
        ipcRenderer.on('selected-file', (event: any, files: Array<string>) => {
            if (callback) {
                callback(files);
            }
            resolve(files);
        });
    });
};