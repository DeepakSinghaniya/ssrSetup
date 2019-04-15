import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { } from 'cookie-parser'
import reducer from '../store/reducers';
import { API_URL } from '../../config';

const createReduxStore = (req) => {
    let cookie = req.get('cookie');
    if (!cookie) {
        cookie = 'city=new-delhi'
    }
    if (!cookie.includes('city=')) {
        cookie += '; city=new-delhi'
    }

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { cookie: cookie || '' }
    });
    const store = createStore(reducer, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
    return store;
}

export default createReduxStore; 