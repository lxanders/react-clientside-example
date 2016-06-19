import bodyParser from 'body-parser';
import { v4 } from 'node-uuid';
import createEntitiesRouter from './createEntitiesRouter';

// eslint-disable-next-line max-statements
const createServer = (expressServer, apiPath, data = {}, generateId = v4) => {
    const { entities } = data;

    expressServer.use(bodyParser.json());
    expressServer.use(`${apiPath}/entities`, createEntitiesRouter(generateId, entities));

    return expressServer;
};

export default createServer;
