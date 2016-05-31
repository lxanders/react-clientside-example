var webpack = require('webpack');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var RunMode = require('run-mode');
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

if (RunMode.isProduction()) {
    config.plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }));
} else if (RunMode.isDevelopment()){
    config.plugins.push(new WebpackBuildNotifierPlugin({ sound: false }));
}

module.exports = config;
