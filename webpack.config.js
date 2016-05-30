var webpack = require('webpack');
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
}

module.exports = config;
