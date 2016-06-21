import express from 'express';

const createEntitiesRouter = (generateId, entities = {}) => {
    const entitiesRouter = express.Router(); // eslint-disable-line new-cap

    const getEntities = (req, res) => {
        res.status(200)
        .json(entities);
    };

    const getEntity = (req, res) => {
        const entity = entities[req.params.id];

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

        // eslint-disable-next-line no-param-reassign
        entities[createdEntity.id] = createdEntity;

        res.status(201)
        .location(`/${createdEntity.id}`)
        .json(createdEntity);
    };

    const updateEntity = (req, res) => {
        const { id } = req.params;
        let entity = entities[id];

        if (entity) {
            entity = req.body;

            res.status(200)
            .location(`/${id}`)
            .json(entity);
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
