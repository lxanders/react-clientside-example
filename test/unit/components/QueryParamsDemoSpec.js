import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import KeyValueList from '../../../src/components/KeyValueList';
import QueryParamsDemo from '../../../src/components/QueryParamsDemo';

describe('QueryParamsDemo', () => {
    const createComponent = (location) => {
        return <QueryParamsDemo location={location} />;
    };

    it('should render the provided query parameters', () => {
        const queryParameters = {
            some: 'foo',
            bar: true
        };
        const location = { query: queryParameters };
        const queryParamsDemo = shallow(createComponent(location));
        const keyValueList = queryParamsDemo.find(KeyValueList);

        expect(keyValueList.prop('object')).to.equal(queryParameters);
    });
});
