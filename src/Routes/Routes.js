import HomePage from '../pages/Home/Home';

import App from '../App';



export default [{
    ...App,
    routes: [
        {
            ...HomePage,
            path: '/',
            exact: true
        },
    ]
}

];