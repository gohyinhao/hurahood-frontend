const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            BACKEND_URL: JSON.stringify('http://api.hurahood.com'),
            GOOGLE_AUTH_ID: JSON.stringify(
                '716214309935-9vakhkqcktvl3rvsngr4v1bv96enoid4.apps.googleusercontent.com',
            ),
            FACEBOOK_AUTH_ID: JSON.stringify('259620321987908'),
            AUTH_STATE_KEY: JSON.stringify('2AyK5fG1p31ODEeA0rcbP9GslZADn6Y7'),
        }),
    ],
});
