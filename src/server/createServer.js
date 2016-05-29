import createEntitiesRouter from './createEntitiesRouter';

// eslint-disable-next-line max-statements
export default (expressServer, apiPath, data = {}) => {
    const { entities } = data;

    expressServer.use(`${apiPath}/entities`, createEntitiesRouter(entities));

    return expressServer;
};
