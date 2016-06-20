import { combineReducers } from 'redux';
import R from 'ramda';
import * as types from '../actions/types';

const items = (state = [], action) => {
    switch (action.type) {
    case types.ADD_ENTITY_SUCCESS:
        return [ ...state, action.entity ];
    case types.FETCH_ENTITIES_SUCCESS:
        return R.uniq([ ...state, ...action.items ]);
    default:
        return state;
    }
};

const ids = (state = [], action) => {
    const handlers = {
        [types.ADD_ENTITY_SUCCESS]: () => [ ...state, action.entity.id ],
        [types.FETCH_ENTITIES_SUCCESS]: () => [ ...state, ...R.map((entity) => entity.id, action.items) ]
    };

    const handleAction = handlers[action.type];

    return handleAction ? handleAction() : state;
};

const isInProgress = (state = false, action) => {
    const inProgress = () => true;
    const notInProgress = () => false;

    const handlers = {
        [types.ADD_ENTITY_REQUEST]: inProgress,
        [types.FETCH_ENTITIES_REQUEST]: inProgress,
        [types.ADD_ENTITY_SUCCESS]: notInProgress,
        [types.ADD_ENTITY_FAILURE]: notInProgress,
        [types.FETCH_ENTITIES_SUCCESS]: notInProgress,
        [types.FETCH_ENTITIES_FAILURE]: notInProgress
    };

    const handleAction = handlers[action.type];

    return handleAction ? handleAction() : state;
};

const errorMessage = (state = null, action) => {
    const handleError = () => action.errorMessage;
    const noError = () => null;

    const handlers = {
        [types.ADD_ENTITY_REQUEST]: noError,
        [types.ADD_ENTITY_SUCCESS]: noError,
        [types.FETCH_ENTITIES_REQUEST]: noError,
        [types.FETCH_ENTITIES_SUCCESS]: noError,
        [types.ADD_ENTITY_FAILURE]: handleError,
        [types.FETCH_ENTITIES_FAILURE]: handleError
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
