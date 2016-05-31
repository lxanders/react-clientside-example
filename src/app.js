import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RunMode from 'run-mode';
import reducers from './reducers/index';
import Routes from './components/Routes';
import createServices from './services/index';

const enhanceStore = () => {
    const middlewares = applyMiddleware(thunk.withExtraArgument(createServices()));

    if (RunMode.isDevelopment()) {
        return compose(
            middlewares,
            window.devToolsExtension ? window.devToolsExtension() : (f) => f
        );
    }

    return middlewares;
};

const store = createStore(
    reducers,
    enhanceStore()
);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    rootElement
);
