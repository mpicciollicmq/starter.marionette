var webpack = require('webpack');

module.exports = {
    
    entry: {
        app: './app/scripts/app.js',
        core: [
            'jquery',
            'lodash',
            'backbone',
            'backbone.marionette'
        ]
    },
    
    output: {
        path: 'dist/scripts',
        publicPath: '/scripts/',
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js'
    },
    
    resolve: {
        extensions: ['', '.js'],
        
        modulesDirectories: [
            'app/scripts',
            '.tmp/scripts',
            'web_modules',
            'node_modules',
            'test'
        ],
        
        alias: {
            underscore: 'lodash',
            handlebars: 'handlebars/dist/handlebars'
        }
    },
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components/,
                loader: 'babel-loader'
            }
        ]
    },
    
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('core', 'core.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
    
};