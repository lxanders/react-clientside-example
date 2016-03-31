import React from 'react';

const EntityListItem = ({ name }) => (
    <span>{name}</span>
);

EntityListItem.propTypes = {
    name: React.PropTypes.string.isRequired
};

export default EntityListItem;
