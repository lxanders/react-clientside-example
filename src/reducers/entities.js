const createEntity = (entity) => {
    return {
        name: entity.name
    };
};

export default (state = [], action) => {
    switch (action.type) {
    case 'ADD_ENTITY':
        return [
            ...state,
            createEntity(action)
        ];
    default:
        return state;
    }
};
