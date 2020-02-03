import React from 'react';
import FileTree from 'ui/FileTree';
import { ProjectData } from 'typed/project'
import { createMenu, getProjectData, listProjectFiles } from './helper';

class ProjectWindow extends React.Component {
    state = {
        data: null
    };
 
    componentDidMount() {
        createMenu();
        getProjectData()
            .then((data: any) => {
                console.log(data);
                listProjectFiles(data.folder)
                    .then((files:any) => {
                        console.log('files:',files)
                    });
            });
    }

    render() {
        console.log(this.state);
        return (
            <main className="main">
                <div className="container">
                    <div className="main-wrap">
                        <FileTree />
                    </div>
                </div>
            </main>
        );
    };
};

export default ProjectWindow;