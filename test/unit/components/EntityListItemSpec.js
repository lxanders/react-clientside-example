import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Link } from 'react-router';
import EntityListItem from '../../../src/components/EntityListItem';

describe('EntityListItem', function () {
    const createComponent = (entityProps) => {
        return <EntityListItem {...entityProps} />;
    };

    it('should use the entity id for the link creation', function () {
        const entityProps = { name: 'anyName', id: 'abcd' };
        const entityListItem = shallow(createComponent(entityProps));
        const link = entityListItem.find(Link);

        expect(link.prop('to')).to.equal(`/entities/${entityProps.id}`);
        expect(link.children().text()).to.equal(entityProps.name);
    });
});
