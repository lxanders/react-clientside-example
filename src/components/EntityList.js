import React from 'react';
import EntityListItem from './EntityListItem';

const EntityList = ({ entities }) => {
    const entitiesHeader = entities.length > 0 ? <h2>Entities</h2> : null;

    return (
        <section className='entity-list'>
            {entitiesHeader}
            <ul>
                {entities.map((entity) =>
                    <li key={entity.id}>
                        <EntityListItem entity={entity} />
                    </li>
                )}
            </ul>
        </section>
    );
};

EntityList.propTypes = {
    entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired
    }))
};

export default EntityList;
