[![Build Status](https://img.shields.io/travis/lxanders/react-clientside-example/master.svg?style=flat)](https://travis-ci.org/lxanders/react-clientside-example)

-----

# react-clientside-example

This is an example for client side rendered React, Redux and hot reloading.

The project is kept very minimalistic by intent to not confuse with unnecessary complexity.

## Stack

### ES2015, transpiling & bundling

The application is written in ES2015 - [`babel`](https://github.com/babel/babel) is used for transpiling it back to ES5 for compatibility. Additionally it takes care of transpiling JSX to ES5.

Note: As [`webpack`](https://github.com/webpack/webpack) is used for transpiling the code from ES2015 and bundling the application, the webpack configuration file `webpack.config.js` is the only file not written in ES2015.

### Server

A small and simple [`express`](https://github.com/expressjs/express/) server is used for serving the initial html as well as the bundled application.

An alternative solution would have been to use the [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) which already is preconfigured to support hot reloading. In real life applications however it is quite common to have a server that e.g. acts as proxy to other backends. This is easier to implement if your server is already a standard server that can be extended.

To use ES2015 in the development server `babel-node` is used, a command provided by [`babel-cli`](https://github.com/babel/babel/tree/master/packages/babel-cli). It is not meant for production use as it requires a lot of memory and is heavy weight.

### Linting

In this project [`eslint`](https://github.com/eslint/eslint) is used together with the strict but useful rule configuration provided by [`eslint-config-holidaycheck`](https://github.com/holidaycheck/eslint-config-holidaycheck).

## Next steps if you want to extend this for your project

If you intend to use this as the basis for your application you should keep some points in mind:

* As told above the server is currently meant for development only. If you want to use it in production, you should invest some time to prepare it for that (e.g. one point would be to not use `babel-node` anymore)
