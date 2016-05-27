import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../../../src/reducers/index';
import App from '../../../src/components/App';
import Routes from '../../../src/components/Routes';

describe('Routes', function () {
    function createComponent() {
        const fetcherModule = sinon.stub().resolves({ status: 200, json: sinon.stub().returns([]) });
        const store = createStore(
            reducers,
            applyMiddleware(thunk.withExtraArgument(fetcherModule))
        );

        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }

    it('should render the app component on the default route', function () {
        const routes = mount(createComponent());

        expect(routes.find(App).length).to.equal(1);
    });
});
