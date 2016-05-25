import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Form, FormControl } from 'react-bootstrap';
import reducers from '../../../src/reducers/index';
import Routes from '../../../src/components/Routes';

describe('Home', function () {
    function createComponent(store = createStore(reducers)) {
        return (
            <Provider store={store}>
                <Routes />
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
        const app = mount(createComponent());
        const addEntityForm = app.find(Form);

        submitFormWithInputValue(addEntityForm, entity1.name);
        submitFormWithInputValue(addEntityForm, entity2.name);

        const entityListItems = app.find('.entity-list').find('li');

        expect(entityListItems.at(0).text()).equals(entity1.name);
        expect(entityListItems.at(1).text()).equals(entity2.name);
    });

    it('should render no items if no entity was stored', function () {
        const app = shallow(createComponent());
        const entityListItems = app.find('.entity-list').find('li');

        expect(entityListItems.length).to.equal(0);
    });
});
