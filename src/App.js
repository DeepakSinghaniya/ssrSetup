import React, { Fragment } from 'react';
import './I18n/i18n';

import { renderRoutes } from 'react-router-config';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


const App = ({ route }) => {
    return (
        <Fragment>
                <Header />
                <div className="inner-app-container">{renderRoutes(route.routes)}</div>
                <Footer />
        </Fragment>
    );
}


const loadData = (store, req) => {
    return null;
}


export default { component: App, loadData }
