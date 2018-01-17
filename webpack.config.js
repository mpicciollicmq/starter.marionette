var webpack = require('webpack');
var entry = './src/app/main.js',
output = {
    path: __dirname,
    filename: 'main.js'
},
uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compressor: {
        screw_ie8: true,
        warnings: false
    },
    output: {
        comments: false
    }
});

module.exports.development = {
    devtool : 'eval',
    entry: entry,
    output: output,
    module : {
        rules : [
            { test: /\.js?$/, exclude: /node_modules/, use: ['babel-loader'] },
            { test: /\.hbs$/, use: ['handlebars-loader'] }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};

module.exports.production = {
    entry: entry,
    output: output,
    module : {
        rules : [
            { test: /\.js?$/, exclude: /node_modules/, use: ['babel-loader'] },
            { test: /\.hbs$/, use: ['handlebars-loader'] }
        ]
    },
    plugins: [
        uglifyJsPlugin,
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};