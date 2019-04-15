import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import 'nodelist-foreach-polyfill';

import routes from '../Routes/Routes';
import reducer from '../store/reducers';
import { axiosInstance } from './httpInstance';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, window.INITIAL_STATE, composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance))));
Loadable.preloadReady().then(() => {
    // Loadable.preloadAll().then(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                    {renderRoutes(routes)}
            </BrowserRouter>
        </Provider>
        , document.querySelector('#root'));
});