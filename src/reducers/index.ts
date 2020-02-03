import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({}),
    composeWithDevTools(applyMiddleware(thunk))
);