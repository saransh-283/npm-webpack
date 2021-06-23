const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const page1Html = new HtmlWebpackPlugin({
    template: './src/assets/html/page1/index.html',
    inject: 'body',
    chunks: ['page1', 'global'],
    filename: 'page1/index.html'
})

const page2Html = new HtmlWebpackPlugin({
    template: './src/assets/html/page2/index.html',
    inject: 'body',
    chunks: ['page2', 'global'],
    filename: 'page2/index.html'
})

const pageHtml = new HtmlWebpackPlugin({
    template: './src/assets/html/Page2/page2.html',
    inject: true,
    chunks: ['page2', 'global'],
    filename: '[name]/index.html'
})

module.exports = {
    mode: 'development',
    entry: {
        global: './src/assets/js/main.js',
        page1: './src/assets/html/page1/page1.js',
        page2: './src/assets/html/page2/page2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name].js'
    },
    devServer: {
        host: '192.168.43.186',
        disableHostCheck: true,
        port: "5500",
        open: true,
        contentBase: ['./dist/page1']
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    // options: {
                    //     sources: {
                    //         list: [{
                    //             tag: 'a',
                    //             attribute: 'href',
                    //             type: 'src'
                    //         }],
                    //     }
                    // }
                }]

            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/[name].css'
        }),
        page1Html,
        page2Html
        // pageHtml
    ]
}