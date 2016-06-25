import { PropTypes } from 'react';

const entity = PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
});

const entities = PropTypes.object;
const entitiesList = PropTypes.arrayOf(entity);

export {
    entity,
    entities,
    entitiesList
};
