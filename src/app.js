import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import reducers from './reducers/index';
import Routes from './components/Routes';

const store = createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument(fetch))
);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    rootElement
);
