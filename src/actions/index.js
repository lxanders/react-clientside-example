import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';

export const addEntity = createAction('ADD_ENTITY');
export const requestEntities = createAction('REQUEST_ENTITIES');

export function fetchEntities() {
    return (dispatch, getState, fetchModule = fetch) => {
        dispatch(requestEntities({ status: 'fetching' }));

        return fetchModule('http://localhost:3000/api/entities', { method: 'get' })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }

            throw new Error(`${response.status}: ${response.statusText}`);
        })
        .then((entities) => dispatch(requestEntities({ status: 'success', items: entities })))
        .catch((error) => dispatch(requestEntities({ status: 'error', error: error.message })));
    };
}
