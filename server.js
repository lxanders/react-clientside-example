import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Express from 'express';
import path from 'path';
import webpackConfig from './webpack.config';

const app = new Express();
const port = 3000;
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
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
