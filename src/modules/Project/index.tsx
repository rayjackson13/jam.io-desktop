import React from 'react';
import FileTree from 'ui/FileTree';
import { ProjectData } from 'typed/project'
import { createMenu, getProjectData } from './helper';

class ProjectWindow extends React.Component {
    state = {
        data: null
    };
 
    componentDidMount() {
        createMenu();
        getProjectData()
            .then((data: unknown) => {
                this.setState({
                    data
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