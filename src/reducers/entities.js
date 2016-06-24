import { combineReducers } from 'redux';
import * as types from '../actions/types';

const items = (state = {}, action) => {
    const addItem = () => ({ ...state, [action.entity.id]: action.entity });
    const addItems = () => ({ ...state, ...action.items });

    const handlers = {
        [types.ADD_ENTITY_SUCCESS]: addItem,
        [types.FETCH_ENTITY_SUCCESS]: addItem,
        [types.FETCH_ENTITIES_SUCCESS]: addItems
    };

    const handleAction = handlers[action.type];

    return handleAction ? handleAction() : state;
};

const ids = (state = [], action) => {
    const addId = () => [ ...state, action.entity.id ];
    const addIds = () => [ ...state, ...Object.keys(action.items) ];

    const handlers = {
        [types.ADD_ENTITY_SUCCESS]: addId,
        [types.FETCH_ENTITY_SUCCESS]: addId,
        [types.FETCH_ENTITIES_SUCCESS]: addIds
    };

    const handleAction = handlers[action.type];

    return handleAction ? handleAction() : state;
};

const isInProgress = (state = false, action) => {
    const setInProgress = () => true;
    const resetInProgress = () => false;

    const handlers = {
        [types.ADD_ENTITY_REQUEST]: setInProgress,
        [types.ADD_ENTITY_SUCCESS]: resetInProgress,
        [types.ADD_ENTITY_FAILURE]: resetInProgress,
        [types.FETCH_ENTITY_REQUEST]: setInProgress,
        [types.FETCH_ENTITY_SUCCESS]: resetInProgress,
        [types.FETCH_ENTITY_FAILURE]: resetInProgress,
        [types.FETCH_ENTITIES_REQUEST]: setInProgress,
        [types.FETCH_ENTITIES_SUCCESS]: resetInProgress,
        [types.FETCH_ENTITIES_FAILURE]: resetInProgress
    };

    const handleAction = handlers[action.type];

    return handleAction ? handleAction() : state;
};

const errorMessage = (state = null, action) => {
    const setError = () => action.errorMessage;
    const resetError = () => null;

    const handlers = {
        [types.ADD_ENTITY_REQUEST]: resetError,
        [types.ADD_ENTITY_SUCCESS]: resetError,
        [types.ADD_ENTITY_FAILURE]: setError,
        [types.FETCH_ENTITY_REQUEST]: resetError,
        [types.FETCH_ENTITY_SUCCESS]: resetError,
        [types.FETCH_ENTITY_FAILURE]: setError,
        [types.FETCH_ENTITIES_REQUEST]: resetError,
        [types.FETCH_ENTITIES_SUCCESS]: resetError,
        [types.FETCH_ENTITIES_FAILURE]: setError
    };

    const handleAction = handlers[action.type];

    return handleAction ? handleAction() : state;
};

export const getItems = (state) => state.items;
export const getIsInProgress = (state) => state.isInProgress;
export const getErrorMessage = (state) => state.errorMessage;

export default combineReducers({
    items,
    ids,
    isInProgress,
    errorMessage
});
