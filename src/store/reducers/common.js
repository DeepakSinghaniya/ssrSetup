import {
    FETCH_COMMON_DATA,
    
} from '../actionsTypes';

const commonReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_COMMON_DATA:
            return { ...state, ...action.payLoad } || null;

       
        default:
            return state;
    }
}

export default commonReducer;