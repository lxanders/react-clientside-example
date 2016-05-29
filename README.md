[![Build Status](https://img.shields.io/travis/lxanders/react-clientside-example/master.svg?style=flat)](https://travis-ci.org/lxanders/react-clientside-example)
[![Coverage Status](https://img.shields.io/coveralls/lxanders/react-clientside-example/master.svg?style=flat)](https://coveralls.io/r/lxanders/react-clientside-example)

-----

# react-clientside-example

This is an example for client side rendered React and Redux.

The project is kept very minimalistic by intent to not confuse with unnecessary complexity.

## Stack

### ES2015, transpiling & bundling

The application is written in ES2015 - [`babel`](https://github.com/babel/babel) is used for transpiling it back to ES5 for compatibility. Additionally it takes care of transpiling JSX to ES5.

### Server

A small and simple [`express`](https://github.com/expressjs/express/) server is used for serving the initial html as well as the bundled application and assets.

Note: As the `server.js` file is the entry point for the transpiling, this file can't be written in ES2015.

### Linting

In this project [`eslint`](https://github.com/eslint/eslint) is used together with the strict but useful rule configuration provided by [`eslint-config-holidaycheck`](https://github.com/holidaycheck/eslint-config-holidaycheck).

## Next steps if you want to extend this for your project

If you intend to use this as the basis for your application you should keep some points in mind:

* Serving assets and other static files from an `express` app is not optimal. You might want to invest some time to find a better suited solution for you that e.g. serves these static files from a server like Nginx
* Don't use the `dev` npm script in production, use the intended `start` script
