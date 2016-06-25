import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities, * as fromEntities from './entities';

const reducers = combineReducers({
    entities,
    routing: routerReducer
});

export const getEntity = (state, id) => fromEntities.getItem(state.entities, id);
export const getEntities = (state) => fromEntities.getItems(state.entities);
export const getEntitiesIsInProgress = (state) => fromEntities.getIsInProgress(state.entities);
export const getEntitiesErrorMessage = (state) => fromEntities.getErrorMessage(state.entities);

export default reducers;
