import React from 'react';
import EntityListItem from './EntityListItem';

const EntityList = ({ entities }) => {
    return (
        <ul>
            {entities.map((entity) =>
                <li>
                    <EntityListItem {...entity} />
                </li>
            )}
        </ul>
    );
};

EntityList.propTypes = {
    entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired
    }))
};

export default EntityList;
