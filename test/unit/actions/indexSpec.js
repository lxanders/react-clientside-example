import { expect } from 'chai';
import { addEntity } from '../../../src/actions/index';

describe('addEntity', function () {
    it('should create an action to add an entity', function () {
        const entityName = 'any name';
        const expectedAction = {
            type: 'ADD_ENTITY',
            name: entityName
        };

        expect(addEntity(entityName)).to.deep.equal(expectedAction);
    });
});
