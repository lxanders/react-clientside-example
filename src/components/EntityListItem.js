import React from 'react';
import { Link } from 'react-router';

const createEntityDetailsUri = (id) => {
    return `/entities/${id}`;
};

const EntityListItem = ({ name, id }) => {
    return <Link to={createEntityDetailsUri(id)}>{name}</Link>;
};

EntityListItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
};

export default EntityListItem;
