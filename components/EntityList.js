import React from 'react';
import EntityListItem from './EntityListItem';

const EntityList = ({ entities }) => {
    return (
        <ul>
            {entities.map((entity) =>
                <li key={entity.id}>
                    <EntityListItem {...entity} />
                </li>
            )}
        </ul>
    );
};

EntityList.propTypes = {
    entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired
    }))
};

export default EntityList;
