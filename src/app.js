import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import Routes from './components/Routes';
import createServices from './services/index';

const store = createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument(createServices()))
);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    rootElement
);
