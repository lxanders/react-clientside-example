import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Form, FormControl } from 'react-bootstrap';
import reducers from '../../../src/reducers/index';
import Home from '../../../src/components/Home';

describe('Home', function () {
    function createComponent() {
        const fetcherModule = sinon.stub().resolves({ status: 200, json: sinon.stub().returns([]) });
        const store = createStore(
            reducers,
            applyMiddleware(thunk.withExtraArgument(fetcherModule))
        );

        return (
            <Provider store={store}>
                <Home />
            </Provider>
        );
    }

    function submitFormWithInputValue(form, value) {
        form.find(FormControl).simulate('change', { target: { value } });
        form.simulate('submit');
    }

    it('should render all stored entities', function () {
        const entity1 = { name: 'firstentry' };
        const entity2 = { name: 'secondentry' };
        const home = mount(createComponent());
        const addEntityForm = home.find(Form);

        submitFormWithInputValue(addEntityForm, entity1.name);
        submitFormWithInputValue(addEntityForm, entity2.name);

        const entityListItems = home.find('.entity-list').find('li');

        expect(entityListItems.at(0).text()).equals(entity1.name);
        expect(entityListItems.at(1).text()).equals(entity2.name);
    });

    it('should render no items if no entity was stored', function () {
        const home = shallow(createComponent());
        const entityListItems = home.find('.entity-list').find('li');

        expect(entityListItems.length).to.equal(0);
    });
});
