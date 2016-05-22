import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import R from 'ramda';
import { Link } from 'react-router';
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

    const testCases = [
        { name: 'a', expected: 'a' },
        { name: 'A', expected: 'a' },
        { name: 'a b', expected: 'ab' },
        { name: 'äb', expected: 'b' },
        { name: '#a', expected: 'a' },
        { name: 'a3', expected: 'a3' }
    ];

    testCases.forEach((testCase) => {
        it('should remove non-word characters and lower-case the result', function () {
            const { name, expected } = testCase;
            const expectedUri = `/entities/${expected}`;
            const entityListItem = shallow(createComponent({ name }));
            const link = entityListItem.find(Link);

            expect(link.prop('to')).to.equal(expectedUri);
            expect(link.children().text()).to.equal(name);
        });
    });
});
