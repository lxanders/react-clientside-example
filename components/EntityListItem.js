import React from 'react';

const EntityListItem = ({ id, name }) => (
    <span>{id}: {name}</span>
);

EntityListItem.propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired
};

export default EntityListItem;
