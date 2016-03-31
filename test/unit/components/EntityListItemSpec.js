import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import R from 'ramda';
import EntityListItem from '../../../components/EntityListItem';

describe('EntityListItem', function () {
    function createDefaultProps() {
        return {
            name: 'any name'
        };
    }

    function createComponent(props = {}) {
        const mergedProps = R.merge(createDefaultProps(), props);

        return <EntityListItem {...mergedProps} />;
    }

    it('should render the passed in entity data', function () {
        const name = 'foobarbaz';
        const entityListItem = shallow(createComponent({ name }));

        expect(entityListItem.text()).to.equal(name);
    });
});
