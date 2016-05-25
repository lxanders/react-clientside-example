import { handleActions } from 'redux-actions';

export default handleActions({
    ADD_ENTITY: (state, action) => [
        ...state, { name: action.payload }
    ]
}, []);
