require('babel-register');

/* eslint-disable */
var path = require('path');
var express = require('express');
var RunMode = require('run-mode');
var createServer = require('./createServer').default;
var rootPath = path.join(__dirname, '..', '..');
var bootstrapFontsPath = path.join(rootPath, 'node_modules', 'bootstrap-sass', 'assets', 'fonts', 'bootstrap');
var port = 3000;
var environment = RunMode.get();
var server = express();
/* eslint-enable */

server.use('/assets/img', express.static(path.join(__dirname, '..', 'assets', 'img')));
server.use('/assets/fonts', express.static(bootstrapFontsPath));

server.get('/bundle.js', function (req, res) {
    res.sendFile(path.join(rootPath, 'build', 'bundle.js'));
});

if (environment === 'development') {
    server.get('/bundle.js.map', function (req, res) {
        res.sendFile(path.join(rootPath, 'build', 'bundle.js.map'));
    });
}

server.get('/main.css', function (req, res) {
    res.sendFile(path.join(rootPath, 'build', 'main.css'));
});

server = createServer(server, '/api', { entities: [ { name: 'foo' }, { name: 'bar' }, { name: 'baz' } ] });

server.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

server.listen(port, (error) => {
    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    } else {
        // eslint-disable-next-line no-console
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
