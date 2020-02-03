import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import setRoutes from 'config/routing';
import * as serviceWorker from 'config/serviceWorker';
import getHistory from 'helpers/history';
import { store } from 'reducers';
import routes from './routes';
import 'styles/index.sass';

const target = document.querySelector('#app');
const history = getHistory();

const app = (
    <Router history={ history }>
        <Provider store={ store }>
            { setRoutes(routes) }
        </Provider>
    </Router>
);

ReactDOM.render(app, target);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();