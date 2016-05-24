import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import entities from './entities';

const reducers = combineReducers({
    entities,
    routing: routerReducer
});

export default reducers;
