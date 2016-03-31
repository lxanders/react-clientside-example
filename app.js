
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';

const store = createStore(reducers);
const rootElement = document.getElementById('root');

let render = () => {
    const App = require('./components/App').default;

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement
    );
};

if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
        const RedBox = require('redbox-react');

        ReactDOM.render(
            <RedBox error={error} />,
            rootElement
        );
    };

    render = () => {
        try {
            renderApp();
        } catch (error) {
            renderError(error);
        }
    };

    module.hot.accept('./components/App', () => {
        setTimeout(render);
    });
}

render();
