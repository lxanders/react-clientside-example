import request from 'supertest-as-promised';
import { expect } from 'chai';
import express from 'express';
import createServer from '../../../src/server/createServer';

describe('createEntitiesRouter', function () {
    const prepareServer = (entities = [], generateId) => {
        const apiBasePath = '';

        return createServer(express(), apiBasePath, { entities }, generateId);
    };

    it('should respond with 200 and all entities for GET /entities if successful', function () {
        const entities = [ { name: 'any', id: '10' }, { name: 'other', id: '20' } ];
        const server = prepareServer(entities);

        return request(server)
            .get('/entities')
            .expect(200)
            .then((res) => {
                expect(res.body).to.deep.equal(entities);
            });
    });

    it('should respond with 200 and the selected entity for GET /entities/:id if successful', function () {
        const entityId = '0';
        const entity = { name: 'anyEntity', id: entityId };
        const server = prepareServer([ entity ]);

        return request(server)
            .get(`/entities/${entityId}`)
            .expect(200)
            .then((res) => {
                expect(res.body).to.deep.equal(entity);
            });
    });

    it('should respond with 404 for GET /entities/:id for a non-existing entity', function () {
        const emptyEntities = [];
        const server = prepareServer(emptyEntities);

        return request(server)
            .get('/entities/123')
            .expect(404);
    });

    it('should respond with 201 and the created entity for POST /entities if successful', function () {
        const id = '123';
        const generateId = () => id;
        const entityPayload = { name: 'prior-non-existing-entity' };
        const expectedEntity = { name: entityPayload.name, id };
        const server = prepareServer(undefined, generateId);

        return request(server)
            .post('/entities')
            .send(entityPayload)
            .expect(201)
            .expect('location', `/${id}`)
            .then((res) => {
                expect(res.body).to.deep.equal(expectedEntity);
            });
    });

    it('should respond with 200 and the updated entity for PUT /entities/:id if successful', function () {
        const entity = { id: '123', name: 'oldName' };
        const updatedEntity = { id: entity.id, name: 'newName' };
        const server = prepareServer([ entity ]);

        return request(server)
            .put(`/entities/${entity.id}`)
            .send(updatedEntity)
            .expect(200)
            .expect('location', `/${entity.id}`)
            .then((res) => {
                expect(res.body).to.deep.equal(updatedEntity);
            });
    });

    it('should respond with 400 for PUT /entities/:id if no entity with the specified id existed', function () {
        const emptyEntities = [];
        const server = prepareServer(emptyEntities);

        return request(server)
            .put('/entities/123')
            .expect(400);
    });
});
