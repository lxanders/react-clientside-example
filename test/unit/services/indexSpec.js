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
        it('should return the stored entity if successful', function () {
            const entity = { name: 'foo' };
            const { storeEntity } = createServices();

            const scope = nock('http://localhost:3000')
            .post('/api/entities')
            .reply(200, entity);

            return storeEntity(entity)
            .then((result) => {
                expect(result).to.deep.equal(entity);
                scope.done();
            });
        });

        it('should return rejected if the request did not return successfully', function () {
            const { storeEntity } = createServices();

            const scope = nock('http://localhost:3000')
            .post('/api/entities')
            .reply(500);

            return expect(storeEntity()).to.be.rejectedWith('500: Internal Server Error')
            .then(() => {
                scope.done();
            });
        });
    });

    describe('fetchEntity', function () {
        it('should return the entity if the request was successful', function () {
            const { fetchEntity } = createServices();
            const entity = { name: 'entity1', id: '123' };

            const scope = nock('http://localhost:3000')
            .get('/api/entities/123')
            .reply(200, entity);

            return expect(fetchEntity(entity.id)).to.become(entity)
            .then(() => {
                scope.done();
            });
        });

        it('should return rejected if the request did not return successful', function () {
            const { fetchEntity } = createServices();

            const scope = nock('http://localhost:3000')
            .get('/api/entities/123')
            .reply(404);

            return expect(fetchEntity('123')).to.be.rejectedWith('404: Not Found')
            .then(() => {
                scope.done();
            });
        });
    });

    describe('fetchEntities', function () {
        it('should return the entities if the request was successful', function () {
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
