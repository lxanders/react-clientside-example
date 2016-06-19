import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RunMode from 'run-mode';
import reducers from './reducers/index';
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

const configureStore = () => {
    return createStore(
        reducers,
        enhanceStore()
    );
};

export default configureStore;
