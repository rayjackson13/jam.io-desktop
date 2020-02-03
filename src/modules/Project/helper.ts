import projectTemplate from 'menu/project';
import { ProjectData } from 'typed/project';
const { remote, ipcRenderer } = window.require('electron');

declare global {
    interface Window {
        require: any
    }
}

export const createMenu = () => {
    const { Menu } = remote;
    const menu = Menu.buildFromTemplate(projectTemplate);
    Menu.setApplicationMenu(menu);
}

export const getProjectData = () => {
    return new Promise(resolve => {
        ipcRenderer.on('get-project-data', (event: any, data: ProjectData) => {
            resolve(data);
        });
    });
}

export const listProjectFiles = (folder: string) => {
    return new Promise(resolve => {
        ipcRenderer.send('list-files', folder);
        ipcRenderer.on('list-files-response', (event: any, files: Array<string>) => {
            console.log(files);
            resolve(files);
        });
    });
};