import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import R from 'ramda';
import EntityList from '../../../components/EntityList';
import EntityListItem from '../../../components/EntityListItem';

describe('EntityList', function () {
    function createDefaultProps() {
        return {
            entities: [
                {
                    id: 3,
                    name: 'any name'
                },
                {
                    id: 7,
                    name: 'other name'
                }
            ]
        };
    }

    function render(props = {}) {
        const mergedProps = R.merge(createDefaultProps(), props);

        return shallow(<EntityList {...mergedProps} />);
    }

    it('should render an empty list if the passed entities were empty', function () {
        const entityList = render({ entities: [] });

        expect(entityList.find('li').length).toEqual(0);
    });

    it('should render the passed in entities as list', function () {
        const entityList = render();
        const listItems = entityList.find('li');

        expect(listItems.length).toEqual(2);
        expect(listItems.first().children().is(EntityListItem)).toEqual(true);
        expect(listItems.last().children().is(EntityListItem)).toEqual(true);
    });

    it('should render the passed in entities in the correct oder', function () {
        const entities = [ { id: 11, name: 'foo' }, { id: 22, name: 'bar' } ];
        const entityList = render({ entities });
        const entityListItems = entityList.find(EntityListItem);

        expect(entityListItems.length).toEqual(entities.length);
        expect(entityListItems.first().props()).toEqual(R.head(entities));
        expect(entityListItems.last().props()).toEqual(R.last(entities));
    });
});
