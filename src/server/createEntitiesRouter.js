import express from 'express';
import R from 'ramda';

const createEntitiesRouter = (generateId, entities = []) => {
    const entitiesRouter = express.Router(); // eslint-disable-line new-cap

    const getEntities = (req, res) => {
        res.status(200)
        .json(entities);
    };

    const getEntity = (req, res) => {
        const { id } = req.params;
        const entity = R.find(R.propEq('id', id))(entities);

        if (entity) {
            res.status(200)
            .json(entity);
        } else {
            res.status(404)
            .end();
        }
    };

    const addEntity = (req, res) => {
        const createdEntity = {
            id: generateId(),
            ...req.body
        };

        entities.push(createdEntity);

        res.status(201)
        .location(`/${createdEntity.id}`)
        .json(createdEntity);
    };

    const updateEntity = (req, res) => {
        const { id } = req.params;
        let entity = R.find(R.propEq('id', id))(entities);
        const updatedEntity = R.merge(entity, req.body);

        if (entity) {
            entity = updatedEntity;

            res.status(200)
            .location(`/${updatedEntity.id}`)
            .json(updatedEntity);
        } else {
            res.status(400)
            .end();
        }
    };

    entitiesRouter.get('/', getEntities);
    entitiesRouter.post('/', addEntity);
    entitiesRouter.get('/:id', getEntity);
    entitiesRouter.put('/:id', updateEntity);

    return entitiesRouter;
};

export default createEntitiesRouter;
