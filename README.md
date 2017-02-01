# Marionette/Backbone Starter

### Setup
Clone the repository and install the dependencies.
```shell
$ git clone https://github.com/rentlio/starter.marionette.git my-app && cd $_
$ npm install -g gulp karma-cli
$ npm install
```

### Develop
Builds the application and starts a webserver with livereload. By default the webserver starts at port 9000.

```shell
$ gulp
```

By default, it builds in debug mode.

- If you need to build in release mode, add `--type production` flag.
- You can define a port with `--port 3333` flag.

### Build
Builds a minified version of the application in the dist folder.

```shell
$ gulp build --type production
```

### Test
Unit and integration tests are powered by [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/):

```shell
$ gulp test
```

Detect errors and potential problems in code with [JSHint](http://jshint.com/):

```shell
$ gulp lint
```

### Components
- [Backbone.js](http://backbonejs.org/)
- [Marionette.js](http://marionettejs.com/)
- [Lodash](https://lodash.com/)
- [Handlebars](http://handlebarsjs.com/)
- [Sass](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Karma](http://karma-runner.github.io/0.12/index.html)
- [Mocha](http://mochajs.org/)
- [Chai](http://chaijs.com/)
- [Webpack](http://webpack.github.io/)
- [Babel](https://babeljs.io/)

### Contribution
Ready to submit a fix or a feature? Submit a pull request! And _please_:

- If code changes, run the tests and make sure everything still works.
- Write new tests for new functionality.
- Maintain the existing style.

### Credits
starter.marionette is inspired by [Ignacio Rivas'](https://github.com/sabarasaba) [Modern Backbone Starter-kit](https://github.com/sabarasaba/modern-backbone-starterkit)

### Contact
- [Juraj Hilje](https://github.com/jurajhilje), [@juraj_hilje](https://twitter.com/juraj_hilje)

### Licence
Licensed under the MIT license.