import welcomeTemplate from 'menu/welcome';
const { remote } = window.require('electron');

declare global {
    interface Window {
        require: any
    }
}

export const createMenu = () => {
    const { Menu } = remote;
    const menu = Menu.buildFromTemplate(welcomeTemplate);
    Menu.setApplicationMenu(menu);
}