require('babel-register');

/* eslint-disable */
var Express = require('express');
var path = require('path');
var app = new Express();
var port = 3000;
var bootstrapFontsPath = path.join(__dirname, 'node_modules', 'bootstrap-sass', 'assets', 'fonts', 'bootstrap');
/* eslint-enable */

app.use('/assets/img', Express.static(path.join(__dirname, 'assets', 'img')));
app.use('/assets/fonts', Express.static(bootstrapFontsPath));

app.get('/bundle.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'bundle.js'));
});

app.get('/main.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'main.css'));
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
