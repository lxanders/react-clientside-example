import { expect } from 'chai';
import * as types from '../../../src/actions/types';
import entities from '../../../src/reducers/entities';

describe('entities reducer', function () {
    it('should create the initial state', function () {
        const expectedState = {
            items: [],
            isInProgress: false,
            errorMessage: null
        };

        expect(entities(undefined, {})).to.deep.equal(expectedState);
    });

    const createInitialItems = () => [ { name: 'anyEntity' } ];

    it('should set the corresponding flag on ADD_ENTITY_REQUEST', function () {
        const action = { type: types.ADD_ENTITY_REQUEST };

        const state = {
            items: createInitialItems(),
            isInProgress: false,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: createInitialItems(),
            isInProgress: true,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should add a new entity on ADD_ENTITY_SUCCESS', function () {
        const newEntity = { name: 'newEntity' };
        const action = { type: types.ADD_ENTITY_SUCCESS, entity: newEntity };

        const state = {
            items: createInitialItems(),
            isInProgress: true,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: [ ...createInitialItems(), newEntity ],
            isInProgress: false,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should save an error message for ADD_ENTITY_FAILURE', function () {
        const newErrorMessage = 'new error message';
        const action = { type: types.ADD_ENTITY_FAILURE, errorMessage: newErrorMessage };

        const state = {
            items: createInitialItems(),
            isInProgress: true,
            errorMessage: null
        };

        const expectedState = {
            items: createInitialItems(),
            isInProgress: false,
            errorMessage: newErrorMessage
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should set the corresponding flag on FETCH_ENTITIES_REQUEST', function () {
        const action = { type: types.FETCH_ENTITIES_REQUEST };

        const state = {
            items: createInitialItems(),
            isInProgress: false,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: createInitialItems(),
            isInProgress: true,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should add new entities on FETCH_TODOS_SUCCESS', function () {
        const fetchedEntities = [ { name: 'newEntity1' }, { name: 'newEntity2' } ];
        const action = { type: types.FETCH_ENTITIES_SUCCESS, items: fetchedEntities };

        const state = {
            items: createInitialItems(),
            isInProgress: true,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: [ ...createInitialItems(), ...fetchedEntities ],
            isInProgress: false,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should save an error message for FETCH_ENTITIES_FAILURE', function () {
        const newErrorMessage = 'new error message';
        const action = { type: types.FETCH_ENTITIES_FAILURE, errorMessage: newErrorMessage };

        const state = {
            items: createInitialItems(),
            isInProgress: true,
            errorMessage: null
        };

        const expectedState = {
            items: createInitialItems(),
            isInProgress: false,
            errorMessage: newErrorMessage
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });
});
