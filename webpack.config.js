var webpack = require('webpack');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var RunMode = require('run-mode');
var environment = RunMode.get();
var config;

config = {
    entry: './src/app.js',
    output: {
        filename: './build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [ 'es2015', 'react' ]
                }
            }
        ]
    },
    plugins: []
};

if (environment === 'production') {
    config.plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }));
} else if (environment === 'dev' ){
    config.plugins.push(new WebpackBuildNotifierPlugin({ sound: false }));
}

module.exports = config;
