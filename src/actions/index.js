import R from 'ramda';
import * as types from './types';

const storeEntity = (entityName) => {
    return (dispatch, getState, services) => {
        dispatch({ type: types.ADD_ENTITY_REQUEST });

        return services.storeEntity(entityName)
        .then((entity) => dispatch({ type: types.ADD_ENTITY_SUCCESS, entity }))
        .catch((error) => dispatch({ type: types.ADD_ENTITY_FAILURE, errorMessage: error.message }));
    };
};

const isEntityNew = (state, entityName) => {
    const itemNames = R.map(R.prop('name'), state.entities.items);

    return !R.contains(entityName, itemNames);
};

export const storeEntityIfNew = (entityName) => {
    return (dispatch, getState) => {
        if (isEntityNew(getState(), entityName)) {
            return dispatch(storeEntity(entityName));
        }

        const errorMessage = 'Entity with that name was already present. Not adding.';

        dispatch({ type: types.ADD_ENTITY_FAILURE, errorMessage });

        return Promise.resolve();
    };
};

export const fetchEntities = () => {
    return (dispatch, getState, services) => {
        dispatch({ type: types.FETCH_ENTITIES_REQUEST });

        return services.fetchEntities()
        .then((entities) => dispatch({ type: types.FETCH_ENTITIES_SUCCESS, items: entities }))
        .catch((error) => dispatch({ type: types.FETCH_ENTITIES_FAILURE, errorMessage: error.message }));
    };
};
