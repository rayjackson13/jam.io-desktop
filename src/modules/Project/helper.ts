import projectTemplate from 'menu/project';
const { remote } = window.require('electron');

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