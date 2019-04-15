import 'babel-polyfill';
import compression from 'compression';
import express from 'express';
import proxy from 'express-http-proxy';
import { matchPath } from "react-router";
import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import cookieParser from 'cookie-parser'


import renderer from './helpers/renderer';
import routes from './Routes/Routes';
import createReduxStore from './helpers/createStore';
import { API_PROXY_ROUTE, API_URL, X_FORWARDED_HOST, PORT, PAGE_CACHE_TIME_SECONDS } from '../config';
import { cache } from './helpers/cache';

const app = express();
app.use(compression());
app.use(cookieParser());

app.use(
    API_PROXY_ROUTE,
    proxy(API_URL, {
        limit: "120mb",
        proxyReqOptDecorator(opts) {
            opts.headers['x-forwarded-host'] = X_FORWARDED_HOST;
            return opts;
        }
    })
);

app.use(express.static('public'));

app.set('port', process.env.PORT || PORT);

app.get('*', cache(PAGE_CACHE_TIME_SECONDS), function (req, res) {
    const store = createReduxStore(req);

    const matchRoute = matchRoutes(routes, req.path);
    const promises = matchRoute.map(({ route }) => {
        const machedPromise = route.loadData ? route.loadData(store, req, matchPath(req.path, route)) : null;
        if (machedPromise) {
            return typeof machedPromise.then === 'function' ? machedPromise : null;
        } else {
            return null;
        }
    }).map((promise) => {
        if (promise && typeof promise.then === 'function') {
            return (new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            }));
        }
        return null;
    }).filter(item => item !== null);


    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.url) {
            return res.redirect(301, context.url);
        }

        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    });
});

Loadable.preloadAll().then(() => {
    app.listen(app.get('port'), function () {
        console.log('server is listening on port: ' + app.get('port'));
    });
});