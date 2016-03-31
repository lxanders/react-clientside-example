import { expect } from 'chai';
import { addEntity } from '../../../actions/index';
import entities from '../../../reducers/entities';

describe('entities', function () {
    describe('multiple entities', function () {
        it('should return the state unchanged if the action type was not defined', () => {
            const state = [ 'anything' ];
            const action = { type: 'undefined action type' };

            expect(entities(state, action)).to.deep.equal(state);
        });

        it('should create an entity on ADD_ENTITY getting passed an undefined initial state', () => {
            const initialState = undefined;
            const name = 'any entity name';
            const expectedState = [ { name } ];
            const action = addEntity(name);

            expect(entities(initialState, action)).to.deep.equal(expectedState);
        });

        it('should create an entity on ADD_ENTITY getting passed an empty initial state', () => {
            const emptyInitialState = [];
            const name = 'any entity name';
            const expectedState = [ { name } ];
            const action = addEntity(name);

            expect(entities(emptyInitialState, action)).to.deep.equal(expectedState);
        });
    });
});
