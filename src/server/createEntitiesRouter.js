import express from 'express';
import R from 'ramda';

export default (entities = []) => {
    const entitiesRouter = express.Router(); // eslint-disable-line new-cap

    const getAllEntities = (req, res) => {
        res.json(entities);
    };

    const getEntity = (req, res) => {
        const { entityName } = req.params;

        if (R.contains(entityName, entities)) {
            res.status(200).send({ entity: entityName });
        } else {
            res.status(404).end();
        }
    };

    const putEntity = (req, res) => {
        const { entityName } = req.params;
        const entity = { name: entityName };

        if (R.contains(entityName, entities)) {
            res.status(200).send(entity);
        } else {
            entities.push(entity);

            res.status(201).send(entity);
        }
    };

    entitiesRouter.get('/', getAllEntities);
    entitiesRouter.get('/:entityName', getEntity);
    entitiesRouter.put('/:entityName', putEntity);

    return entitiesRouter;
};
