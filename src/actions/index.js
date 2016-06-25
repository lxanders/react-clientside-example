import * as types from './types';

const storeEntity = (entityToStore) => {
    return (dispatch, getState, services) => {
        dispatch({ type: types.ADD_ENTITY_REQUEST });

        return services.storeEntity(entityToStore)
        .then((entity) => dispatch({ type: types.ADD_ENTITY_SUCCESS, entity }))
        .catch((error) => dispatch({ type: types.ADD_ENTITY_FAILURE, errorMessage: error.message }));
    };
};

const fetchEntity = (id) => {
    return (dispatch, getState, services) => {
        dispatch({ type: types.FETCH_ENTITY_REQUEST });

        return services.fetchEntity(id)
        .then((entity) => dispatch({ type: types.FETCH_ENTITY_SUCCESS, entity }))
        .catch((error) => dispatch({ type: types.FETCH_ENTITY_FAILURE, errorMessage: error.message }));
    };
};

const fetchEntities = () => {
    return (dispatch, getState, services) => {
        dispatch({ type: types.FETCH_ENTITIES_REQUEST });

        return services.fetchEntities()
        .then((entities) => dispatch({ type: types.FETCH_ENTITIES_SUCCESS, items: entities }))
        .catch((error) => dispatch({ type: types.FETCH_ENTITIES_FAILURE, errorMessage: error.message }));
    };
};

export {
    storeEntity,
    fetchEntity,
    fetchEntities
};
