import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities, * as fromEntities from './entities';

const reducers = combineReducers({
    entities,
    routing: routerReducer
});

export default reducers;

export const getEntitiesItems = (state) => fromEntities.getItems(state.entities);
export const getEntitiesIsInProgress = (state) => fromEntities.getIsInProgress(state.entities);
export const getEntitiesErrorMessage = (state) => fromEntities.getErrorMessage(state.entities);
