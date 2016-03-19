
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

const rootElement = document.getElementById('root');

let render = () => {
    const App = require('./components/App').default;

    ReactDOM.render(
        <App />,
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
