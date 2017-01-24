var webpack = require('webpack');

module.exports = function(config) {
    config.set({
        
        basePath: '',
        
        frameworks: ['mocha'],
        
        files: [
            'tests/**/*test.js'
        ],
        
        preprocessors: {
            'tests/*'   : ['webpack'],
            'tests/**/*': ['webpack']
        },
        
        webpack: {
            module: {
                loaders : [
                    { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
                    { test: /\.hbs$/, loader: 'handlebars-loader' }
                ]
            }
        },
        
        webpackMiddleware: {
            stats: {
                colors: true
            },
            quiet: true
        },
        
        reporters: ['spec'],
        
        port: 9876,
        
        colors: true,
        
        logLevel: config.LOG_DISABLE,
        
        captureConsole: true,
        
        autoWatch: true,
        
        browsers: ['PhantomJS'],
        
        captureTimeout: 60000,
        
        singleRun: true,
        
        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-spec-reporter'),
            require('karma-phantomjs-launcher')
        ]
        
    });
};