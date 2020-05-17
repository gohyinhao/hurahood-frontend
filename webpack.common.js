const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                            plugins: ['@babel/plugin-proposal-class-properties'],
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
};
