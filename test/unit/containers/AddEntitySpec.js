import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Form, FormControl } from 'react-bootstrap';
import { AddEntity } from '../../../src/containers/AddEntity';
import reducers from '../../../src/reducers/index';

describe('AddEntity', function () {
    const createComponent = (services, dispatch = sinon.spy()) => {
        const store = createStore(
            reducers,
            applyMiddleware(thunk.withExtraArgument(services))
        );

        return (
            <Provider store={store}>
                <AddEntity dispatch={dispatch} />
            </Provider>
        );
    };

    it('should dispatch an action to add an entity on clicking', function () {
        const entityName = 'foo';
        const services = { storeEntity: () => Promise.resolve({ name: entityName }) };
        const dispatch = sinon.spy();
        const addEntity = mount(createComponent(services, dispatch));

        addEntity.find(FormControl).simulate('change', { target: { value: entityName } });
        addEntity.find(Form).simulate('submit', { preventDefault: sinon.stub() });

        expect(dispatch).to.have.been.calledOnce;
        expect(dispatch).to.have.been.calledWith(sinon.match.func);
    });

    it('should not dispatch an action on clicking with an empty name', function () {
        const services = { storeEntity: () => Promise.resolve({ name: '' }) };
        const dispatch = sinon.spy();
        const addEntity = mount(createComponent(services, dispatch));

        addEntity.find('form').simulate('submit', { preventDefault: sinon.stub() });

        expect(dispatch).to.not.have.been.called;
    });

    it('should clear the input after submitting', function () {
        const services = { storeEntity: () => Promise.resolve({ name: '' }) };
        const dispatch = sinon.spy();
        const addEntity = mount(createComponent(services, dispatch));
        const expectedInputValueAfterSubmitting = '';

        addEntity.find('input').simulate('change', { target: { value: 'foo' } });
        addEntity.find('form').simulate('submit', { preventDefault: sinon.stub() });

        expect(dispatch).to.have.been.calledOnce;
        expect(addEntity.find('input').get(0).value).to.equal(expectedInputValueAfterSubmitting);
    });
});
