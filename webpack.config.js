var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var	path	=	require("path");

module.exports	=	{
    mode: "development",
    entry:	"./js/app.jsx",
    output:	{
        filename: "../js/out.js",
        path: path.resolve(__dirname,"js")
    },
    devServer: {
        inline:	true,
        contentBase: './',
        port: 3001
    },
    watch: true,
    watchOptions: {
        poll: true
    },
    module:	{
        rules:	[
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader',
                     'sass-loader']
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:	'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: [
                                        "Chrome 49"
                                    ]
                                }
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader:	"babel-loader",
                    options:	{
                        presets: [
                            "es2015",
                            "stage-2",
                             "react"
                        ]
                    }
                }
            }]
    },
    // plugins: [
    //     new BrowserSyncPlugin({
    //       // browse to http://localhost:3000/ during development,
    //       // ./public directory is being served
    //       host: 'localhost',
    //       port: 3000,
    //       //server: { baseDir: ['dist'] }
    //       proxy: 'http://127.0.0.1:5500'
    //     },
    //     {
    //         reload: true
    //     })
    //   ]
};