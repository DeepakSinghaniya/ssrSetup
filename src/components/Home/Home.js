import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';


const home = props => {
    return (
        <Fragment>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <h1>Home</h1>
        </Fragment>
    );

}

export default home;