const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-transform-runtime',
                            ],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(s?)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(html)$/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpe?g|gif|eot|woff|ttf|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/assets/images/hurahood_logo_no_background.png',
        }),
        // To strip all locales except “en”
        new MomentLocalesPlugin(),
        new webpack.DefinePlugin({
            GOOGLE_AUTH_ID: JSON.stringify(
                '716214309935-9vakhkqcktvl3rvsngr4v1bv96enoid4.apps.googleusercontent.com',
            ),
            FACEBOOK_AUTH_ID: JSON.stringify('259620321987908'),
            AUTH_STATE_KEY: JSON.stringify('2AyK5fG1p31ODEeA0rcbP9GslZADn6Y7'),
        }),
    ],
};
