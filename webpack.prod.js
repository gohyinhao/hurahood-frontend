const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            BACKEND_URL: JSON.stringify('http://api.hurahood.com'),
            FRONTEND_URL: JSON.stringify('http://hurahood-frontend.herokuapp.com'),
        }),
    ],
});
