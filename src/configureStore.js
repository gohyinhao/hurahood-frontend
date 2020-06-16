import { createStore, combineReducers } from 'redux';
import productsReducer from './reducers/products';
import reviewsReducer from './reducers/reviews';
import usersReducer from './reducers/users';

export default () => {
    return createStore(
        combineReducers({
            products: productsReducer,
            reviews: reviewsReducer,
            user: usersReducer,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
};
