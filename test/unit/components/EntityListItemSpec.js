import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import R from 'ramda';
import EntityListItem from '../../../components/EntityListItem';

describe('EntityListItem', function () {
    function createDefaultProps() {
        return {
            id: 42,
            name: 'any name'
        };
    }

    function render(props = {}) {
        const mergedProps = R.merge(createDefaultProps(), props);

        return shallow(<EntityListItem {...mergedProps} />);
    }

    it('should render the passed in entity data', function () {
        const id = 4;
        const name = 'foobarbaz';
        const entityListItem = render({ id, name });

        expect(entityListItem.text()).toEqual(`${id}: ${name}`);
    });
});
