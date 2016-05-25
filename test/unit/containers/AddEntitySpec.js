import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { AddEntity } from '../../../src/containers/AddEntity';
import reducers from '../../../src/reducers/index';

describe('AddEntity', function () {
    function createComponent(dispatch = sinon.spy(), store = createStore(reducers)) {
        return (
            <Provider store={store}>
                <AddEntity dispatch={dispatch}/>
            </Provider>
        );
    }

    it('should dispatch an action to add an entity on clicking', function () {
        const dispatch = sinon.spy();
        const entityName = 'foo';
        const addEntity = mount(createComponent(dispatch));
        const expectedDispatchPayload = {
            type: 'ADD_ENTITY',
            payload: entityName
        };

        addEntity.find('input').simulate('change', { target: { value: entityName } });
        addEntity.find('form').simulate('submit', { preventDefault: sinon.stub() });

        expect(dispatch).to.have.been.calledOnce;
        expect(dispatch).to.have.been.calledWithExactly(expectedDispatchPayload);
    });

    it('should not dispatch an action on clicking with an empty name', function () {
        const dispatch = sinon.spy();
        const addEntity = mount(createComponent(dispatch));

        addEntity.find('form').simulate('submit', { preventDefault: sinon.stub() });

        expect(dispatch).to.not.have.been.called;
    });

    it('should clear the input after submitting', function () {
        const dispatch = sinon.spy();
        const addEntity = mount(createComponent(dispatch));
        const expectedInputValueAfterSubmitting = '';

        addEntity.find('input').simulate('change', { target: { value: 'foo' } });
        addEntity.find('form').simulate('submit', { preventDefault: sinon.stub() });

        expect(dispatch).to.have.been.calledOnce;
        expect(addEntity.find('input').get(0).value).to.equal(expectedInputValueAfterSubmitting);
    });
});
