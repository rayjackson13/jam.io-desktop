import { 
    openFolder,
    createProject
} from 'helpers/project';

export default [
    {
        label: 'jam.io',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                role: 'quit'
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
            },
            {
                type: 'separator'
            },
            {
                label: 'Save Project',
                accelerator: 'CmdOrCtrl+S',
                click: () => {}
            },
            {
                type: 'separator'
            },
            {
                label: 'Close Editor',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                role: 'reload'
            },
            {
                label: 'Toggle Fullscreen',
                accelerator: 'CmdOrCtrl+Shift+F',
                role: 'toggleFullscreen'
            },
        ]
    },
    {
        label: 'Window',
        role: 'windowMenu'
    }
]