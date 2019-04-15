import {API_PROXY_ROUTE} from '../../config';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: API_PROXY_ROUTE
});