import React from 'react';
import { Link } from 'react-router';

const createEntityDetailsUri = (id) => {
    return `/entities/${id}`;
};

const EntityListItem = ({ entity }) => {
    return <Link to={createEntityDetailsUri(entity.id)}>{entity.name}</Link>;
};

EntityListItem.propTypes = {
    entity: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired
    }).isRequired
};

export default EntityListItem;
