import fetch from 'isomorphic-fetch';

export default function createServices(fetchModule = fetch) {
    const storeEntity = (entityName) => {
        return fetchModule(`http://localhost:3000/api/entities/${entityName}`, { method: 'put', body: { entityName } })
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
}
