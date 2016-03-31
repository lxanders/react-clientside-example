import jsdom from 'jsdom';
import chai from 'chai';
import sinonChai from 'sinon-chai';

global.document = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

chai.use(sinonChai);
