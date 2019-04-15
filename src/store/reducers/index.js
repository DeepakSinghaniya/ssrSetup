import { combineReducers } from 'redux';

import commonReducer from './common';


const reducer = combineReducers({
    common: commonReducer,
});

export default reducer;