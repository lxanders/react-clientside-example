import request from 'supertest-as-promised';
import { expect } from 'chai';
import express from 'express';
import createServer from '../../../src/server/createServer';

describe('entitiesRouter', function () {
    function prepareServer(entities = []) {
        const apiBasePath = '';

        return createServer(express(), apiBasePath, { entities });
    }

    it('should fetch all entities for GET /entities', function () {
        const entities = [ 'any', 'entities', 'in', 'here' ];
        const server = prepareServer(entities);

        return request(server)
            .get('/entities')
            .expect(200)
            .then((res) => {
                expect(res.body).to.deep.equal(entities);
            });
    });

    it('should fetch an entity for GET /entities/:entityId', function () {
        const entity = 'existing-entity';
        const server = prepareServer([ entity ]);

        return request(server)
            .get(`/entities/${entity}`)
            .expect(200)
            .then((res) => {
                expect(res.body).to.deep.equal({ entity });
            });
    });

    it('should respond with 404 for GET /entities/:entityId with an non-existing entity', function () {
        const server = prepareServer();

        return request(server)
            .get('/entities/non-existing-entity')
            .expect(404);
    });

    it('should add a non-existing entity for PUT /entities/:entityId', function () {
        const entity = 'prior-non-existing-entity';
        const server = prepareServer();

        return request(server)
            .put(`/entities/${entity}`)
            .expect(201)
            .then((res) => {
                expect(res.body).to.deep.equal({ entity });
            });
    });

    it('should respond with the entity for PUT /entities/:entityId with an already existing entity', function () {
        const entity = 'existing-entity';
        const server = prepareServer([ entity ]);

        return request(server)
            .put(`/entities/${entity}`)
            .expect(200);
    });
});