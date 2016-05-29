import { expect } from 'chai';
import { addEntity, requestEntities } from '../../../src/actions/index';
import entities from '../../../src/reducers/entities';

describe('entities', function () {
    describe('add entity', function () {
        it('it should create the state for the storing status', function () {
            const state = { items: [ { name: 'anything' } ] };
            const action = addEntity({ status: 'storing' });
            const expectedState = {
                status: 'storing',
                items: state.items
            };

            expect(entities(state, action)).to.deep.equal(expectedState);
        });

        it('it should create the state for the success status', function () {
            const state = { items: [ { name: 'anything' } ] };
            const entity = { name: 'new entity' };
            const action = addEntity({ status: 'success', entity });
            const expectedState = {
                status: 'success',
                items: [ { name: 'anything' }, entity ]
            };

            expect(entities(state, action)).to.deep.equal(expectedState);
        });

        it('it should create the state for the warning status', function () {
            const state = { items: [ { name: 'anything' } ] };
            const warning = 'a warning message';
            const action = addEntity({ status: 'warning', warning });
            const expectedState = {
                status: 'warning',
                warning,
                items: state.items
            };

            expect(entities(state, action)).to.deep.equal(expectedState);
        });

        it('it should create the state for the error status', function () {
            const state = { items: [ { name: 'anything' } ] };
            const error = 'an error message';
            const action = addEntity({ status: 'error', error });
            const expectedState = {
                status: 'error',
                error,
                items: state.items
            };

            expect(entities(state, action)).to.deep.equal(expectedState);
        });
    });

    describe('request entities', function () {
        it('it should create the state for the fetching status', function () {
            const state = { items: [ { name: 'anything' } ] };
            const action = requestEntities({ status: 'fetching' });
            const expectedState = {
                status: 'fetching',
                items: state.items
            };

            expect(entities(state, action)).to.deep.equal(expectedState);
        });

        it('it should create the state for the success status', function () {
            const state = { items: [ { name: 'anything' } ] };
            const items = [ { name: 'new entity 1' }, { name: 'new entity 2' } ];
            const action = requestEntities({ status: 'success', items });
            const expectedState = {
                status: 'success',
                items: [ { name: 'anything' }, ...items ]
            };

            expect(entities(state, action)).to.deep.equal(expectedState);
        });

        it('it should create the state for the error status', function () {
            const state = { items: [ { name: 'anything' } ] };
            const error = 'an error message';
            const action = requestEntities({ status: 'error', error });
            const expectedState = {
                status: 'error',
                error,
                items: state.items
            };

            expect(entities(state, action)).to.deep.equal(expectedState);
        });
    });
});
