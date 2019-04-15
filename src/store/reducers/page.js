import {
    FETCH_HOME_COMPONENTS,
} from '../actionsTypes';


const pageReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_HOME_COMPONENTS:
            const homePageData = { ...action.payLoad, pageId: 'homePage' };
            return homePageData;
        default:
            return state;
    }
}

export default pageReducer;