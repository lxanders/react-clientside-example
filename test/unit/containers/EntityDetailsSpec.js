import React from 'react';
import R from 'ramda';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { PageHeader } from 'react-bootstrap';
import { EntityDetails } from '../../../src/containers/EntityDetails';

describe('EntityDetails', () => {
    describe('not connected', () => {
        const createDefaultProps = () => ({
            fetchEntity: sinon.spy(),
            isInProgress: false,
            id: '123-a',
            entity: undefined,
            errorMessage: null
        });

        const createComponent = (props) => {
            const mergedProps = R.merge(createDefaultProps(), props);

            return <EntityDetails {...mergedProps} />;
        };

        it('should execute the corresponding data fetching for the provided entity id', () => {
            const fetchEntity = sinon.spy();
            const entityId = '123-abc';

            mount(createComponent({ fetchEntity, id: entityId }));

            expect(fetchEntity).to.have.been.calledOnce;
            expect(fetchEntity).to.have.been.calledWithExactly(entityId);
        });

        it('should render the provided entity id regardless of the fetching result for this id', () => {
            const id = '123-a';
            const entityDetails = shallow(createComponent({ id }));
            const pageHeaderChildren = entityDetails.find(PageHeader).prop('children');

            expect(pageHeaderChildren).to.deep.equal([ 'Entity details: ', id ]);
        });

        it('should render the entity details', () => {
            const entity = { id: 'asd-123', name: 'any entity name' };
            const entityDetails = shallow(createComponent({ entity }));
            const listItems = entityDetails.find('li');

            expect(listItems.length).to.equal(2);
            expect(listItems.first().text()).to.equal(`id: ${entity.id}`);
            expect(listItems.last().text()).to.equal(`name: ${entity.name}`);
        });

        it('should render the provided error message', () => {
            const errorMessage = 'any error message';
            const expectedError = `No entity found with this key. Message: ${errorMessage}`;
            const entityDetails = shallow(createComponent({ errorMessage }));

            expect(entityDetails.find('.error').text()).to.equal(expectedError);
        });

        it('should render a loading indicator', () => {
            const entityDetails = shallow(createComponent({ isInProgress: true }));

            expect(entityDetails.find('.loading').text()).to.equal('Loading...');
        });
    });
});
