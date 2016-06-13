import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities, * as fromEntities from './entities';

const reducers = combineReducers({
    entities,
    routing: routerReducer
});

export default reducers;

export const getEntityItems = (state) => fromEntities.getEntityItems(state.entities);
export const getEntityStatus = (state) => fromEntities.getEntityStatus(state.entities);
export const getEntityError = (state) => fromEntities.getEntityError(state.entities);
