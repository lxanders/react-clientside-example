import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import reducers from '../../../reducers/index';
import App from '../../../components/App';

describe('App', function () {
    function createComponent(store = createStore(reducers)) {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }

    function submitFormWithInputValue(form, value) {
        const input = form.find('input').get(0);

        input.value = value;
        form.simulate('submit');
    }

    it('should render all stored entities', function () {
        const entity1 = { name: 'first entry' };
        const entity2 = { name: 'second entry' };
        const app = mount(createComponent());
        const addEntityForm = app.find('form');

        submitFormWithInputValue(addEntityForm, entity1.name);
        submitFormWithInputValue(addEntityForm, entity2.name);

        const entityList = app.find('li');

        expect(entityList.at(0).text()).equals(entity1.name);
        expect(entityList.at(1).text()).equals(entity2.name);
    });

    it('should render no items if no entity was stored', function () {
        const app = shallow(createComponent());

        expect(app.find('li').length).to.equal(0);
    });
});
