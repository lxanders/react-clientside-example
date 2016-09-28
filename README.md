[![Build Status](https://img.shields.io/travis/lxanders/react-clientside-example/master.svg?style=flat)](https://travis-ci.org/lxanders/react-clientside-example)
[![Coverage Status](https://img.shields.io/coveralls/lxanders/react-clientside-example/master.svg?style=flat)](https://github.com/lxanders/react-clientside-example)

-----

# react-clientside-example

This is an example for client side rendered React and Redux.

The project is kept quite small by intent to not confuse with unnecessary complexity.

***Note***: There is now the very actively maintained [create-react-app](https://github.com/facebookincubator/create-react-app) which tries to give developers the possibility to not get involved much with configuration. It is still a good idea to know something about the build stack and configuration of your projects so it is still worthwile to have a look at this or other example-projects to get some insights how to configure a web project in terms of bundling, transpiling, etc. Knowing more in these areas will give you a better base for decisions regarding your stack and configuration as well as helps you debugging.

Some of the key technologies used are:

* Building / bundling: [webpack](https://github.com/webpack/webpack)
* Transpiling: [Babel](https://github.com/babel/babel)
* Implementation language: ES2015
* View library: [React](https://github.com/facebook/react)
* State management: [Redux](https://github.com/reactjs/redux/)
* Routing: [React Router](https://github.com/reactjs/react-router)
* Styling:
    * Building: [Sass](http://sass-lang.com/) per [node-sass](https://github.com/sass/node-sass)
    * CSS framework: [Bootstrap](http://getbootstrap.com/) per [bootstrap-sass](https://github.com/twbs/bootstrap-sass)
    * Components: [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap) of Bootstrap
* Server: [express](https://github.com/expressjs/express/)
* Testing:
    * Testrunner: [mocha](https://github.com/mochajs/mocha)
    * Assertions: [Chai](https://github.com/chaijs/chai)
    * Stubbing / spying / mocking: [Sinon.JS](https://github.com/sinonjs/sinon)
    * Coverage: [Istanbul](https://github.com/gotwarlost/istanbul)
    * React test helpers: [Enzyme](https://github.com/airbnb/enzyme/)
* Linting: [ESLint](https://github.com/eslint/eslint)

## Getting started

If you want to test this project setup just clone it, install the dependencies and then run it:

```
$ git clone git@github.com:lxanders/react-clientside-example.git
$ npm install
$ npm run dev
```

## Important npm scripts

These are the main scripts defined in the `package.json`:

* `dev`: Builds the code for development use (e.g. containing source maps) and starts the server afterwards. Provides watching and rebuilding for style and client code changes as well as automatic restarting the server after server code changes
* `start`: Builds the code for production use (e.g. minifying it) and starts the server afterwards
* `test`: Lints the code, executes all unit tests and builds coverage information for it
* `test:unit`: Runs all unit tests but doesn't build coverage information. This is faster than running the full `test` script

## More information

### Transpiling

The application is written in ES2015 - Babel is used for transpiling it back to ES5 for compatibility. Additionally it takes care of transpiling React (JSX) code to ES5.

* Transpiling custom ES2015 and React code to ES5 for the client: Babel is used with a loader through webpack. It is configured independently from the `.babelrc` in the webpack configuration file `webpack.config.js` with the required presets for ES2015 and React. Note: Files containing JSX code use the same file ending `.js` in this project.
* Providing ES2015 standard code in the form of polyfills for the client: This is done by importing `babel-polyfill` in the client root file `src/app.js`.
* Transpiling custom ES2015 and React code for the server and other node environments: This is done by requiring `babel-register` in the server root file `src/server/index.js` and for testing in the mocha test setup for unit tests `test/unit/mocha.opts` by specifying it as the compiler. Note: This uses the babel configuration file `.babelrc`.

### Bundling

Webpack bundles the files for the client application. Depending on the environment it is running in (e.g. development or production) some additional plugins / settings are applied. Have a look at the webpack configuration file `webpack.config.js` for more information.

### Client

The client entry point is the `src/app.js` file. It contains code for configuring the Redux store and starts the rendering process providing the store to all sub components.

#### Routing

The routes configuration is located in the JSX component `src/components/Routes`.

#### Debugging and time travelling

You can install the [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) from the [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)) for these purposes. The integration code required in the project to communicate with this plugin is already in place for development builds.

### Server

The server is used for serving the initial html as well as the bundled application and assets. The server provides also an API for the application and some static initial data for demo purposes.

Note: As the `src/server/index.js` file is the entry point for the transpiling, this file can't be written in ES2015. Files
that are required from this file can use ES2015 though as `babel-register` is loaded by then.

### Software design for testability

Dependency injection is used to keep the code configurable and testable. Three examples for this are:

* The API is configured through an extra module `src/server/createServer.js` which takes e.g. the API path where it should
be registered on the provided express server instance. This makes it easier to test too.
* The thunk middleware is used for asynchronous actions. The `withExtraArgument` method is used to provide the thunks with the service Implementations that should be used. This makes it easy to replace the real API calls with test ones. Compare the initialization for the client in the `src/app.js` and the test initialization in e.g. the action tests file `test/unit/actions/indexSpec.js`.
* Services get an optional fetch module which can be provided for using e.g. a test variant that doesn't do real requests. See the code for this in `src/services/index.js` and the usage in its test file `test/unit/services/indexSpec.js`.

### Linting

ESLint is used together with a strict but useful rule configuration provided by [`eslint-config-holidaycheck`](https://github.com/holidaycheck/eslint-config-holidaycheck).

Parts of the configuration are quite opinionated. Even though there is reasoning behind every setting in there this
reasoning might not apply to you. Feel free to deactivate linting completely (which I would not recommend you to do) or
just configure it the way you like it.

## Next steps if you want to extend this for your project

If you intend to use this as the basis for your application you should keep some points in mind:

* Serving assets and other static files from an `express` app is not optimal. You might want to invest some time to find a better suited solution for you that e.g. serves these static files from a server like Nginx
* Don't use the `dev` npm script in production, use the intended `start` script
* Don't forget to delete the `.git` folder after you cloned the repository and after that setup git / your version control
tool yourself (e.g. by running `git init` for git)
