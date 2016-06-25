import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PageHeader } from 'react-bootstrap';
import NotFound from '../../../src/components/NotFound';

describe('NotFound', () => {
    const createComponent = () => {
        return <NotFound />;
    };

    it('should render the page header for NotFound', () => {
        const notFound = shallow(createComponent());

        expect(notFound.find(PageHeader).children().text()).to.equal('Page not found');
    });
});
