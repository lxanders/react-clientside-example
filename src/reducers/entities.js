import { handleActions } from 'redux-actions';
import R from 'ramda';
import * as types from '../actions/types';

export default handleActions({
    [types.ADD_ENTITY]: (state, action) => {
        const { entity, status } = action.payload;
        const { items } = state;
        const handlers = {
            storing: () => R.merge(state, action.payload),
            success: () => R.merge(state, { status, items: R.append(entity, items) }),
            warning: () => R.merge(state, action.payload),
            error: () => R.merge(state, action.payload)
        };

        return handlers[status]();
    },
    [types.REQUEST_ENTITIES]: (state, action) => {
        const { items, status } = action.payload;
        const handlers = {
            fetching: () => R.merge(state, action.payload),
            success: () => R.merge(state, { status, items: R.uniq(R.concat(state.items, items)) }),
            error: () => R.merge(state, action.payload)
        };

        return handlers[status]();
    }
}, { status: '', items: [] });

export const getEntityItems = (state) => state.items;
export const getEntityStatus = (state) => state.status;
export const getEntityError = (state) => state.error;
