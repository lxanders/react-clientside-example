import React from 'react';
import { Link } from 'react-router';
import { entity as entityDefinition } from '../lib/typeDefinitions';

const createEntityDetailsUri = (id) => {
    return `/entities/${id}`;
};

const EntityListItem = ({ entity }) => {
    return <Link to={createEntityDetailsUri(entity.id)}>{entity.name}</Link>;
};

EntityListItem.propTypes = {
    entity: entityDefinition.isRequired
};

export default EntityListItem;
