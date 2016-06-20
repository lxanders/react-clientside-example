import fetch from 'isomorphic-fetch';

const createServices = (fetchModule = fetch) => {
    const storeEntity = (entity) => {
        return fetchModule('http://localhost:3000/api/entities', {
            method: 'post',
            body: JSON.stringify(entity),
            headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                return response.json();
            }

            throw new Error(`${response.status}: ${response.statusText}`);
        });
    };

    const fetchEntities = () => {
        return fetchModule('http://localhost:3000/api/entities', { method: 'get' })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }

            throw new Error(`${response.status}: ${response.statusText}`);
        });
    };

    return {
        storeEntity,
        fetchEntities
    };
};

export default createServices;
