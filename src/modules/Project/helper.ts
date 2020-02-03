const { ipcRenderer, remote } = window.require('electron');

declare global {
    interface Window {
        require: any
    }
}

const closeWindow = () => {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.close();
}

export const createMenu = (context: any) => {
    const { Menu, MenuItem } = remote;
    const menu = Menu.getApplicationMenu();
    menu.items[1] && menu.items[1].submenu.append(new MenuItem({
        label: 'Save project',
        accelerator: 'CmdOrCtrl+S',
        click: () => undefined
    }));
    const copyMenu = new Menu(menu);
    copyMenu.items[1] && console.log(copyMenu.items[1].submenu.items);
    Menu.setApplicationMenu(menu);
}