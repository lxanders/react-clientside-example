import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import { storeEntity, fetchEntity, fetchEntities } from '../../../src/actions/index';
import * as types from '../../../src/actions/types';

describe('actions', function () {
    const createStore = (services, initialEntityItems = []) => {
        const initialState = {
            entities: {
                status: '',
                items: initialEntityItems
            }
        };

        const getState = () => initialState;
        const mockStore = configureStore([ thunk.withExtraArgument(services) ]);

        return mockStore(getState);
    };

    describe('storeEntity', function () {
        it('should dispatch an action containing the added entity if successful', function () {
            const entityInResponse = { name: 'foo' };
            const services = { storeEntity: () => Promise.resolve(entityInResponse) };
            const store = createStore(services);

            return store.dispatch(storeEntity(entityInResponse))
            .then(() => {
                const expectedActions = [
                    { type: types.ADD_ENTITY_REQUEST },
                    { type: types.ADD_ENTITY_SUCCESS, entity: entityInResponse }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });

        it('should dispatch an action containing an error message if there was an error', function () {
            const errorMessageInResponse = 'any error';
            const services = { storeEntity: () => Promise.reject(new Error(errorMessageInResponse)) };
            const store = createStore(services);

            return store.dispatch(storeEntity('foo'))
            .then(() => {
                const expectedActions = [
                    { type: types.ADD_ENTITY_REQUEST },
                    { type: types.ADD_ENTITY_FAILURE, errorMessage: errorMessageInResponse }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });
    });

    describe('fetchEntity', function () {
        it('should dispatch an action containing the fetched entity if successful', function () {
            const entityInResponse = { name: 'entity1', id: 'foo-a' };
            const services = { fetchEntity: () => Promise.resolve(entityInResponse) };
            const store = createStore(services);

            return store.dispatch(fetchEntity(entityInResponse.id))
            .then(() => {
                const expectedActions = [
                    { type: types.FETCH_ENTITY_REQUEST },
                    { type: types.FETCH_ENTITY_SUCCESS, entity: entityInResponse }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });

        it('should dispatch an action containing an error message if there was an error', function () {
            const errorMessageInResponse = 'any error';
            const services = { fetchEntity: () => Promise.reject(new Error(errorMessageInResponse)) };
            const store = createStore(services);

            return store.dispatch(fetchEntity())
            .then(() => {
                const expectedActions = [
                    { type: types.FETCH_ENTITY_REQUEST },
                    { type: types.FETCH_ENTITY_FAILURE, errorMessage: errorMessageInResponse }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });
    });

    describe('fetchEntities', function () {
        it('should dispatch an action containing the fetched entities if successful', function () {
            const entitiesInResponse = [ { name: 'entity1' }, { name: 'entity2' } ];
            const services = { fetchEntities: () => Promise.resolve(entitiesInResponse) };
            const store = createStore(services);

            return store.dispatch(fetchEntities())
            .then(() => {
                const expectedActions = [
                    { type: types.FETCH_ENTITIES_REQUEST },
                    { type: types.FETCH_ENTITIES_SUCCESS, items: entitiesInResponse }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });

        it('should dispatch an action containing an error message if there was an error', function () {
            const errorMessageInResponse = 'any error';
            const services = { fetchEntities: () => Promise.reject(new Error(errorMessageInResponse)) };
            const store = createStore(services);

            return store.dispatch(fetchEntities())
            .then(() => {
                const expectedActions = [
                    { type: types.FETCH_ENTITIES_REQUEST },
                    { type: types.FETCH_ENTITIES_FAILURE, errorMessage: errorMessageInResponse }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });
    });
});
