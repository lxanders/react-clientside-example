import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Link } from 'react-router';
import EntityListItem from '../../../src/components/EntityListItem';

describe('EntityListItem', () => {
    const createComponent = (entity) => {
        return <EntityListItem entity={entity} />;
    };

    it('should use the entity id for the link creation', () => {
        const entity = { name: 'anyName', id: 'abcd' };
        const entityListItem = shallow(createComponent(entity));
        const link = entityListItem.find(Link);

        expect(link.prop('to')).to.equal(`/entities/${entity.id}`);
        expect(link.children().text()).to.equal(entity.name);
    });
});
