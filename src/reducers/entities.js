import { handleActions } from 'redux-actions';
import R from 'ramda';

export default handleActions({
    ADD_ENTITY: (state, action) => {
        const items = R.uniq([ ...state.items, { name: action.payload } ]);

        return R.merge(state, { items });
    }
}, { status: '', items: [] });
