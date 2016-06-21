import React from 'react';
import EntityListItem from './EntityListItem';
import { entitiesList as entitiesListDefinition } from '../lib/typeDefinitions';

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
    entities: entitiesListDefinition.isRequired
};

export default EntityList;
