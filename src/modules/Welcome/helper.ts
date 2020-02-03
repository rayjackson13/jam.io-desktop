import { 
    openFolder,
    createProject,
    closeWindow
} from 'helpers/project';
const { remote } = window.require('electron');

declare global {
    interface Window {
        require: any
    }
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
                        createProject();
                    }
                },
                {
                    label: 'Open Folder',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        openFolder();
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