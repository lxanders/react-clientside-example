require('babel-register');

/* eslint-disable */
var Express = require('express');
var path = require('path');
var app = new Express();
var port = 3000;
/* eslint-enable */

app.use('/assets', Express.static(path.join(__dirname, 'assets')));
app.use('/bootstrap', Express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

app.get('/bundle.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'bundle.js'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (error) => {
    if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    } else {
        // eslint-disable-next-line no-console
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
