import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import R from 'ramda';
import EntityList from '../../../src/components/EntityList';
import EntityListItem from '../../../src/components/EntityListItem';

describe('EntityList', function () {
    const createDefaultProps = () => {
        return {
            entities: [
                {
                    id: '3',
                    name: 'any name'
                },
                {
                    id: '7',
                    name: 'other name'
                }
            ]
        };
    };

    const createComponent = (props = {}) => {
        const mergedProps = R.merge(createDefaultProps(), props);

        return <EntityList {...mergedProps} />;
    };

    it('should render an empty list if the passed entities were empty', function () {
        const entityList = shallow(createComponent({ entities: [] }));

        expect(entityList.find('li').length).to.equal(0);
    });

    it('should render the passed in entities as list', function () {
        const entityList = shallow(createComponent());
        const listItems = entityList.find('li');

        expect(listItems.length).to.equal(2);
        expect(listItems.first().children().is(EntityListItem)).to.equal(true);
        expect(listItems.last().children().is(EntityListItem)).to.equal(true);
    });

    it('should render the passed in entities in the correct oder', function () {
        const entities = [ { id: '11', name: 'foo' }, { id: '22', name: 'bar' } ];
        const entityList = shallow(createComponent({ entities }));
        const entityListItems = entityList.find(EntityListItem);

        expect(entityListItems.length).to.equal(entities.length);
        expect(entityListItems.first().props()).to.deep.equal({ entity: R.head(entities) });
        expect(entityListItems.last().props()).to.deep.equal({ entity: R.last(entities) });
    });
});
