import { handleActions } from 'redux-actions';
import R from 'ramda';

export default handleActions({
    ADD_ENTITY: (state, action) => {
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
    REQUEST_ENTITIES: (state, action) => {
        const { items, status } = action.payload;
        const handlers = {
            fetching: () => R.merge(state, action.payload),
            success: () => R.merge(state, { status, items: R.uniq(R.concat(state.items, items)) }),
            error: () => R.merge(state, action.payload)
        };

        return handlers[status]();
    }
}, { status: '', items: [] });
