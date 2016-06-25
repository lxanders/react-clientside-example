import { expect } from 'chai';
import * as types from '../../../src/actions/types';
import entities from '../../../src/reducers/entities';

describe('entities reducer', () => {
    it('should create the initial state', () => {
        const expectedState = {
            items: {},
            ids: [],
            isInProgress: false,
            errorMessage: null
        };

        expect(entities(undefined, {})).to.deep.equal(expectedState);
    });

    const createInitialItems = () => ({ fooId: { id: 'fooId', name: 'anyEntity' } });

    it('should set the corresponding flag on ADD_ENTITY_REQUEST', () => {
        const action = { type: types.ADD_ENTITY_REQUEST };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: false,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should add a new entity on ADD_ENTITY_SUCCESS', () => {
        const newEntity = { name: 'newEntity', id: 'foo' };
        const action = { type: types.ADD_ENTITY_SUCCESS, entity: newEntity };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: { ...createInitialItems(), [newEntity.id]: newEntity },
            ids: [ newEntity.id ],
            isInProgress: false,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should save an error message for ADD_ENTITY_FAILURE', () => {
        const newErrorMessage = 'new error message';
        const action = { type: types.ADD_ENTITY_FAILURE, errorMessage: newErrorMessage };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: null
        };

        const expectedState = {
            items: createInitialItems(),
            ids: [],
            isInProgress: false,
            errorMessage: newErrorMessage
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should set the corresponding flag on FETCH_ENTITY_REQUEST', () => {
        const action = { type: types.FETCH_ENTITY_REQUEST };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: false,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should add the received entity on FETCH_ENTITY_SUCCESS', () => {
        const entity = { name: 'anyEntity', id: 'foo' };
        const action = { type: types.FETCH_ENTITY_SUCCESS, entity };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: { ...createInitialItems(), [entity.id]: entity },
            ids: [ entity.id ],
            isInProgress: false,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should save an error message for FETCH_ENTITY_FAILURE', () => {
        const newErrorMessage = 'new error message';
        const action = { type: types.FETCH_ENTITY_FAILURE, errorMessage: newErrorMessage };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: null
        };

        const expectedState = {
            items: createInitialItems(),
            ids: [],
            isInProgress: false,
            errorMessage: newErrorMessage
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should set the corresponding flag on FETCH_ENTITIES_REQUEST', () => {
        const action = { type: types.FETCH_ENTITIES_REQUEST };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: false,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should add new entities on FETCH_TODOS_SUCCESS', () => {
        const entity1 = { name: 'newEntity1', id: '123' };
        const entity2 = { name: 'newEntity2', id: '987' };
        const fetchedEntities = { [entity1.id]: entity1, [entity2.id]: entity2 };
        const action = { type: types.FETCH_ENTITIES_SUCCESS, items: fetchedEntities };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: 'any prior error message'
        };

        const expectedState = {
            items: { ...createInitialItems(), ...fetchedEntities },
            ids: [ entity1.id, entity2.id ],
            isInProgress: false,
            errorMessage: null
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });

    it('should save an error message for FETCH_ENTITIES_FAILURE', () => {
        const newErrorMessage = 'new error message';
        const action = { type: types.FETCH_ENTITIES_FAILURE, errorMessage: newErrorMessage };

        const state = {
            items: createInitialItems(),
            ids: [],
            isInProgress: true,
            errorMessage: null
        };

        const expectedState = {
            items: createInitialItems(),
            ids: [],
            isInProgress: false,
            errorMessage: newErrorMessage
        };

        expect(entities(state, action)).to.deep.equal(expectedState);
    });
});
