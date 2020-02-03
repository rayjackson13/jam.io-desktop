import React from 'react';
import { createMenu } from './helper';

class ProjectWindow extends React.Component {
    componentDidMount() {
        createMenu();
    }

    render() {
        return (
            <div className="app-wrap">
                <main className="projects"></main>
            </div>
        );
    };
};

export default ProjectWindow;