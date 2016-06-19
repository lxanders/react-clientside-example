import bodyParser from 'body-parser';
import createEntitiesRouter from './createEntitiesRouter';

// eslint-disable-next-line max-statements
const createServer = (expressServer, apiPath, data = {}) => {
    const { entities } = data;

    expressServer.use(bodyParser.json());
    expressServer.use(`${apiPath}/entities`, createEntitiesRouter(entities));

    return expressServer;
};

export default createServer;
