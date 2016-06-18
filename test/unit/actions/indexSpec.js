import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import { storeEntityIfNew, fetchEntities } from '../../../src/actions/index';
import * as types from '../../../src/actions/types';

describe('actions', function () {
    function createStore(services, initialEntityItems = []) {
        const initialState = {
            entities: {
                status: '',
                items: initialEntityItems
            }
        };

        const getState = () => initialState;
        const mockStore = configureStore([ thunk.withExtraArgument(services) ]);

        return mockStore(getState);
    }

    describe('storeEntityIfNew', function () {
        it('should dispatch an action containing the added entity if successful', function () {
            const entity = { name: 'foo' };
            const services = { storeEntity: () => Promise.resolve(entity) };
            const store = createStore(services);

            return store.dispatch(storeEntityIfNew(entity.name))
            .then(() => {
                const expectedActions = [
                    { type: types.ADD_ENTITY, payload: { status: 'storing' } },
                    { type: types.ADD_ENTITY, payload: { status: 'success', entity } }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });

        it('should dispatch an action containing a warning if the entity already existed locally', function () {
            const entity = { name: 'foo' };
            const services = { storeEntity: () => Promise.resolve(entity) };
            const store = createStore(services, [ entity ]);

            return store.dispatch(storeEntityIfNew(entity.name))
            .then(() => {
                const warning = 'Entity with that name was already present. Not adding.';
                const expectedActions = [
                    { type: types.ADD_ENTITY, payload: { status: 'warning', warning } }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });

        it('should dispatch an action containing an error message if there was an error', function () {
            const entity = { name: 'foo' };
            const errorMessage = 'any error';
            const services = { storeEntity: () => Promise.reject(new Error(errorMessage)) };
            const store = createStore(services);

            return store.dispatch(storeEntityIfNew(entity.name))
            .then(() => {
                const expectedActions = [
                    { type: types.ADD_ENTITY, payload: { status: 'storing' } },
                    { type: types.ADD_ENTITY, payload: { status: 'error', error: errorMessage } }
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
                    { type: types.REQUEST_ENTITIES, payload: { status: 'fetching' } },
                    { type: types.REQUEST_ENTITIES, payload: { status: 'success', items: entitiesInResponse } }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });

        it('should dispatch an action containing an error message if there was an error', function () {
            const errorMessage = 'any error';
            const services = { fetchEntities: () => Promise.reject(new Error(errorMessage)) };
            const store = createStore(services);

            return store.dispatch(fetchEntities())
            .then(() => {
                const expectedActions = [
                    { type: types.REQUEST_ENTITIES, payload: { status: 'fetching' } },
                    { type: types.REQUEST_ENTITIES, payload: { status: 'error', error: errorMessage } }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });
    });
});
