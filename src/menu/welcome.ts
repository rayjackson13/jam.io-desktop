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
            }
        ]
    },
    {
        label: 'Window',
        submenu: [
            {
                label: 'Close Window',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }
        ]
    }
]