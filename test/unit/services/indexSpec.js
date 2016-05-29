import { expect } from 'chai';
import nock from 'nock';
import sinon from 'sinon';
import createServices from '../../../src/services/index';

describe('services', function () {
    beforeEach(function () {
        nock.cleanAll();
    });

    describe('createServices', function () {
        it('should use the provided fetcher modul instead of the default if one was provided', function () {
            const fetchModule = sinon.stub().returns(Promise.resolve());
            const { fetchEntities } = createServices(fetchModule);

            fetchEntities();

            expect(fetchModule).to.have.been.calledOnce;
        });
    });

    describe('storeEntity', function () {
        it('should return the stored entity and status 200 if it was created', function () {
            const entity = { name: 'foo' };
            const { storeEntity } = createServices();

            const scope = nock('http://localhost:3000')
            .put(`/api/entities/${entity.name}`)
            .reply(200, entity);

            return storeEntity(entity.name)
            .then((result) => {
                expect(result).to.deep.equal(entity);
                scope.done();
            });
        });

        it('should return the entity and status 201 if it already existed', function () {
            const entity = { name: 'foo' };
            const { storeEntity } = createServices();

            const scope = nock('http://localhost:3000')
            .put(`/api/entities/${entity.name}`)
            .reply(201, entity);

            return storeEntity(entity.name)
            .then((result) => {
                expect(result).to.deep.equal(entity);
                scope.done();
            });
        });

        it('should return rejected if the request did not return successfully', function () {
            const { storeEntity } = createServices();

            const scope = nock('http://localhost:3000')
            .put('/api/entities/anything')
            .reply(500);

            return storeEntity('anything')
            .catch((result) => {
                expect(result).to.deep.equal(new Error('500: Internal Server Error'));
                scope.done();
            });
        });
    });

    describe('fetchEntities', function () {
        it('should return the entities and status 200 if the request was successful', function () {
            const { fetchEntities } = createServices();
            const entities = [ { name: 'entity1' }, { name: 'entity2' } ];

            const scope = nock('http://localhost:3000')
            .get('/api/entities')
            .reply(200, entities);

            return expect(fetchEntities()).to.become(entities)
            .then(() => {
                scope.done();
            });
        });

        it('should return rejected if the request did not return successfully', function () {
            const { fetchEntities } = createServices();

            const scope = nock('http://localhost:3000')
            .get('/api/entities')
            .reply(500);

            return expect(fetchEntities()).to.be.rejectedWith('500: Internal Server Error')
            .then(() => {
                scope.done();
            });
        });
    });
});
