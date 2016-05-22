import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import KeyValueList from '../../../components/KeyValueList';

describe('KeyValueList', function () {
    function createComponent(object) {
        return <KeyValueList object={object} />;
    }

    it('should return a list if the object to list had content', function () {
        const keyValueList = shallow(createComponent({ any: 'thing' }));
        const list = keyValueList.find('ul');

        expect(list.length).to.equal(1);
    });

    it('should not return a list if the object to list was empty', function () {
        const keyValueList = shallow(createComponent({}));
        const list = keyValueList.find('ul');

        expect(list.length).to.equal(0);
    });

    it('should render all passed in objects as a formatted list item with the key and the value', function () {
        const objectToList = { foo: 'bar', baz: 123 };
        const keyValueList = shallow(createComponent(objectToList));
        const listItems = keyValueList.find('li');

        expect(listItems.length).to.equal(2);
        expect(listItems.at(0).text()).to.equal('foo: bar');
        expect(listItems.at(1).text()).to.equal('baz: 123');
    });
});
