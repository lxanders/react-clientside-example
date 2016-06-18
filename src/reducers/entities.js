import R from 'ramda';
import * as types from '../actions/types';

const addEntity = (state, action) => {
    const { entity, status } = action.payload;
    const { items } = state;
    const handlers = {
        storing: () => R.merge(state, action.payload),
        success: () => R.merge(state, { status, items: R.append(entity, items) }),
        warning: () => R.merge(state, action.payload),
        error: () => R.merge(state, action.payload)
    };

    return handlers[status]();
};

const requestEntities = (state, action) => {
    const { items, status } = action.payload;
    const handlers = {
        fetching: () => R.merge(state, action.payload),
        success: () => R.merge(state, { status, items: R.uniq(R.concat(state.items, items)) }),
        error: () => R.merge(state, action.payload)
    };

    return handlers[status]();
};

const initialState = {
    status: '',
    items: []
};

const entities = (state = initialState, action) => {
    switch (action.type) {
    case types.ADD_ENTITY:
        return addEntity(state, action);
    case types.REQUEST_ENTITIES:
        return requestEntities(state, action);
    default:
        return state;
    }
};

export default entities;

export const getEntityItems = (state) => state.items;
export const getEntityStatus = (state) => state.status;
export const getEntityError = (state) => state.error;
