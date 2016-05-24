import React from 'react';
import { Link } from 'react-router';

function createEntityDetailsUri(name) {
    const normalizedName = name.trim().toLowerCase().replace(/\W/g, '');

    return `/entities/${normalizedName}`;
}

const EntityListItem = ({ name }) => (
    <Link to={createEntityDetailsUri(name)}>{name}</Link>
);

EntityListItem.propTypes = {
    name: React.PropTypes.string.isRequired
};

export default EntityListItem;
