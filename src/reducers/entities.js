import { handleActions } from 'redux-actions';
import R from 'ramda';

export default handleActions({
    ADD_ENTITY: (state, action) => {
        const items = R.uniq([ ...state.items, { name: action.payload } ]);

        return R.merge(state, { items });
    },
    REQUEST_ENTITIES: (state, action) => {
        const newState = R.merge(state, action.payload);

        if (action.payload.status === 'success') {
            newState.items = R.uniq(R.concat(state.items, action.payload.items));
        }

        return newState;
    }
}, { status: '', items: [] });
