import jsdom from 'jsdom';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import 'sinon-as-promised';

const html = '<!doctype html><html><head></head><body></body></html>';

global.document = jsdom.jsdom(html, { url: 'http://localhost' });
global.window = document.defaultView;
global.navigator = window.navigator;

chai.use(sinonChai);
chai.use(chaiAsPromised);
