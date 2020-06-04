import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './configureStore';
import AppRouter from './routers/AppRouter';
import './styles/main.scss';

const store = createStore();

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(app, document.querySelector('#app'));
