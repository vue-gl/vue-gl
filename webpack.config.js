module.exports = {
    entry: {
        app: "./play/app",
        preview: "./play/preview"
    },
    output: {
        path: __dirname + "/docs/js",
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: "vue-loader"
            }]
        }, {
            test: /\.js$/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        }]
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        }
    },
    devServer: {
        contentBase: __dirname + "/docs",
        publicPath: "/js/"
    }
};
