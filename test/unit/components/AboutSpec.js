import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { PageHeader } from 'react-bootstrap';
import About from '../../../components/About';

describe('About', function () {
    function createComponent() {
        return <About />;
    }

    it('should render the page header for About', function () {
        const about = shallow(createComponent());

        expect(about.find(PageHeader).children().text()).to.equal('About');
    });
});
