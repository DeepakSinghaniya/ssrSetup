import React from 'react';
import { Helmet } from 'react-helmet';
import stylesheet from '../../../public/css/stylesheet/home/home.css';

const mapStyleSheet = () => {
    return (
        <Helmet>
            <style>{stylesheet.replace("home.css.map", "css/stylesheet/home/home.css.map")}</style>
            {/* <link href="css/stylesheet/home/home.css" rel="stylesheet" /> */}

        </Helmet>
    );
};


export default mapStyleSheet; 