const path = require("path");

// Transpiling and Bundling config
module.exports = {
    context: path.join(__dirname, "src"),
    entry: [
        "./main.js",
    ],
    output: {
        path: path.join(__dirname, "www"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    resolve:{
        modules: [
            path.join(__dirname, "node_modules"),
        ]
    }
}

// For local development
module.exports.devServer = {
    contentBase: './www',
    port: 9000
};

module.exports.devtool = 'inline-source-map';