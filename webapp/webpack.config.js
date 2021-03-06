const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Transpiling and Bundling config
module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
        'whatwg-fetch', './main.ts'
    ],
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            namedExport: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.json', '.ts', '.tsx', '.css', '.scss']
    }
};

// For local development
module.exports.devServer = {
    contentBase: './www',
    port: 9001
};

module.exports.devtool = 'inline-source-map';
