import React from 'react';
import { 
    openFolder, 
    createProject 
} from 'helpers/project';
import { ReactComponent as NewIcon } from 'assets/svg/joystick.svg';
import { ReactComponent as OpenIcon } from 'assets/svg/open.svg';
import { createMenu } from './helper';
import './Welcome.sass';

class Welcome extends React.Component {
    componentDidMount() {
        createMenu();
    }

    render() {
        return (
            <div className="app-wrap">
                <main className="welcome">
                    <div className="welcome__container">
                        <div className="welcome__wrap">
                            <h2 className="welcome__title">welcome to jam.io</h2>
                            <p className="welcome__desc">here you can:</p>
                            <div className="welcome__option-wrap">
                                <button 
                                    type="button" 
                                    className="welcome__option"
                                    onClick={() => createProject()}
                                >
                                    <NewIcon className="welcome__option-new" />
                                    <span className="welcome__option-text">Create New Project</span>
                                </button>
                                <span className="welcome__option-sep">or</span>
                                <button 
                                    type="button" 
                                    className="welcome__option"
                                    onClick={() => openFolder()}
                                >
                                    <OpenIcon className="welcome__option-open" />
                                    <span className="welcome__option-text">Open Existing Project</span>
                                </button>
                            </div>
                            <p className="welcome__copy">
                                &copy;&nbsp;jam.io. Created with TypeScript, Electron and&nbsp;<span role="img" aria-label="Love">❤️</span>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
};

export default Welcome;