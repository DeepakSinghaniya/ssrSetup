import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeComponents from '../../components/Home/Home';





class Home extends Component {
    render() {
        return <HomeComponents />
    }

}


const loadData = (store) => {
    return null;
}

const mapDispatchToProps = (dispatch) => {
    return {
     
    }
}

const mapStateWithProps = state => {
    return {
    }
}


const HomeWithRedux = connect(mapStateWithProps, mapDispatchToProps)(Home)

const HomeWithLoadData = { component: HomeWithRedux, loadData };

export default HomeWithLoadData;
