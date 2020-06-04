import { createStore, combineReducers } from 'redux';
import productsReducer from './reducers/products';
import reviewsReducer from './reducers/reviews';

export default () => {
    return createStore(
        combineReducers({
            products: productsReducer,
            reviews: reviewsReducer,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
};
