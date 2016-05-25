import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PageHeader } from 'react-bootstrap';
import EntityDetails from '../../../src/components/EntityDetails';

describe('EntityDetails', function () {
    function createComponent(params = { entityId: 'foo' }, location = { query: {} }) {
        return <EntityDetails params={params} location={location} />;
    }

    it('should render the entity id in the page header', function () {
        const entityId = 'anyid';
        const entityDetails = shallow(createComponent({ entityId }));

        expect(entityDetails.find(PageHeader).contains(entityId)).to.equal(true);
    });

    it('should not render a query parameters header if there were no query parameters', function () {
        const entityDetails = shallow(createComponent());

        expect(entityDetails.find('h3').length).to.equal(0);
    });

    it('should render an query parameters header if there were query parameters', function () {
        const query = { query: { foo: 'bar' } };
        const entityDetails = shallow(createComponent(undefined, query));

        expect(entityDetails.find('h3').text()).to.equal('Query parameters');
    });
});