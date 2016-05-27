import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import { addEntity, fetchEntities } from '../../../src/actions/index';

describe('actions', function () {
    describe('addEntity', function () {
        it('should create an action to add an entity', function () {
            const entityName = 'any name';
            const expectedAction = {
                type: 'ADD_ENTITY',
                payload: entityName
            };

            expect(addEntity(entityName)).to.deep.equal(expectedAction);
        });
    });

    describe('fetchEntities', function () {
        it('should dispatch REQUEST_ENTITIES with the correct status when successful', function () {
            const mockStore = configureStore([ thunk ]);
            const store = mockStore();
            const entitiesInResponse = [ { name: 'entity1' }, { name: 'entity2' } ];

            nock('http://localhost:3000')
            .get('/api/entities')
            .reply(200, entitiesInResponse);

            return store.dispatch(fetchEntities())
            .then(() => {
                const expectedActions = [
                    { type: 'REQUEST_ENTITIES', payload: { status: 'fetching' } },
                    { type: 'REQUEST_ENTITIES', payload: { status: 'success', items: entitiesInResponse } }
                ];

                expect(store.getActions()).to.deep.equal(expectedActions);
            });
        });

        it('should dispatch REQUEST_ENTITIES with an error status if there was an error', function () {
            const mockStore = configureStore([ thunk ]);
            const store = mockStore();
            const invalidResponseData = undefined;

            nock('http://localhost:3000')
            .get('/api/entities')
            .reply(200, invalidResponseData);

            return store.dispatch(fetchEntities())
            .then(() => {
                const errorAction = {
                    type: 'REQUEST_ENTITIES',
                    payload: { status: 'error', error: 'Unexpected end of JSON input' }
                };

                expect(store.getActions()).to.contain(errorAction);
            });
        });

        it('should dispatch REQUEST_ENTITIES with an error status if the api replied with status 404', function () {
            const mockStore = configureStore([ thunk ]);
            const store = mockStore();

            nock('http://localhost:3000')
            .get('/api/entities')
            .reply(404);

            return store.dispatch(fetchEntities())
            .then(() => {
                const errorAction = {
                    type: 'REQUEST_ENTITIES',
                    payload: { status: 'error', error: '404: Not Found' }
                };

                expect(store.getActions()).to.contain(errorAction);
            });
        });
    });
});
