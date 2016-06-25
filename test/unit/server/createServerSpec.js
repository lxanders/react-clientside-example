import { expect } from 'chai';
import sinon from 'sinon';
import createServer from '../../../src/server/createServer';

describe('createServer', () => {
    it('should register the entities api on the provided base uri', () => {
        const server = { use: sinon.spy() };
        const apiPath = '/any-path';
        const expectedRoutePath = `${apiPath}/entities`;

        createServer(server, apiPath);

        expect(server.use).to.have.been.calledWithMatch(expectedRoutePath, sinon.match.func);
    });
});
