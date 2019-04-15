import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'

import routes from '../Routes/Routes';
import stats from '../../public/js/react-loadable.json';
import { browserClasses } from '../shared/utility';

const renderer = (req, store, context) => {

    let modules = [];
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{ context }}>
                <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                        {renderRoutes(routes)}
                </Loadable.Capture>
            </StaticRouter>
        </Provider>
    );
    const helmet = Helmet.renderStatic();
    const bundles = getBundles(stats, modules).map(item => {
        if (typeof item === 'object') {
            return item.file;
        } else {
            console.log('\x1b[36m%s\x1b[0m: ', 'ReactLoadable Warning: Item not found in react-loadable.json,');
            console.log('\x1b[36m', modules, '\x1b[0m:');
            return null;
        }
    }).filter(item => item !== null).filter((value, index, self) => self.indexOf(value) === index && value !== 'js/bundle.js' && value.includes('.js.map') !== true);



    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <base href="/">
    ${helmet.meta.toString()}
    ${helmet.title.toString()}
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,400i,500,600,700" rel="stylesheet" /> 
    <link href="css/font-awesome/font-awesome.css" rel="stylesheet" />
    <link href="css/font-face/font-face.css" rel="stylesheet" /> 
    <link href="css/bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="css/global/global.css" rel="stylesheet" />
    ${helmet.style.toString()}
    ${helmet.link.toString()}
    </head>
    <body className="${browserClasses(req.headers['user-agent'])}">
        <div id="root">${content}</div>
        <script>
        /* <![CDATA[ */
        window.INITIAL_STATE = ${serialize(store.getState())}
        /* ]]> */
        </script>
        ${bundles.map(bundle => {
        return `<script src="${bundle}"></script>`
        // alternatively if you are using publicPath option in webpack config
        // you can use the publicPath value from bundle, e.g:
        // return `<script src="${bundle.publicPath}"></script>`
    }).join('\n')}
        <script src="js/bundle.js"></script>
        <script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>
    </body>
    </html>`;
}

export default renderer;