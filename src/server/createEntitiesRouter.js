import express from 'express';
import R from 'ramda';

export default (entities = []) => {
    const entitiesRouter = express.Router(); // eslint-disable-line new-cap

    function getAllEntities(req, res) {
        res.json(entities);
    }

    function getEntity(req, res) {
        const { entityId } = req.params;

        if (R.contains(entityId, entities)) {
            res.status(200).send({ entity: entityId });
        } else {
            res.status(404).end();
        }
    }

    function putEntity(req, res) {
        const { entityId } = req.params;

        if (R.contains(entityId, entities)) {
            res.status(200).send();
        } else {
            entities.push(req.params.entityId);
            res.status(201).send({ entity: entityId });
        }
    }

    entitiesRouter.get('/', getAllEntities);
    entitiesRouter.get('/:entityId', getEntity);
    entitiesRouter.put('/:entityId', putEntity);

    return entitiesRouter;
};