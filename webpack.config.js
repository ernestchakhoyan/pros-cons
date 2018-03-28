const path = require('path');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcssURL = require('postcss-url');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (_, env) => {
    const isProduction = env.mode === 'production';

    return {
        context: path.resolve(__dirname, './src'),
        entry: {
            'app': './App',
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[file].map',
        },
        resolve: {
            extensions: [ '.js', '.jsx', '.scss', '.css', '.json' ],
            modules: [
                path.resolve(__dirname, './node_modules'),
            ],
        },
        devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, './src'),
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                comments: true,
                                env: {
                                    development: {
                                        plugins: [
                                            'transform-decorators-legacy',
                                            'syntax-object-rest-spread',
                                            'transform-object-rest-spread',
                                            'transform-class-properties',
                                        ],
                                        presets: [
                                            [ 'react' ],
                                        ],
                                    },
                                    production: {
                                        plugins: [
                                            'transform-decorators-legacy',
                                            'syntax-object-rest-spread',
                                            'transform-object-rest-spread',
                                            'transform-class-properties',
                                        ],
                                        presets: [
                                            [ 'react' ],
                                            [ 'env' ],
                                        ],
                                    }
                                },
                            }
                        },
                    ]
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: [ 'style-loader' ],
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    url: false,
                                    sourceMap: true,
                                    minimize: isProduction,
                                    importLoaders: true,
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    sourceMap: true,
                                    plugins: [
                                        postcssURL(),
                                        autoprefixer(),
                                        cssnano(),
                                    ],
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                    sourceMapContents: !isProduction,
                                    outputStyle: 'compressed',
                                }
                            },
                        ]
                    }),
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin([
                `./dist`,
            ]),
            new HtmlWebPackPlugin({
                template: './index.html',
                filename: './index.html'
            }),
            new ExtractTextPlugin({
                filename: '[name].min.css',
                allChunks: true,
                disable: !isProduction,
            }),
        ],
        performance: {
            hints: isProduction && 'warning',
            maxEntrypointSize: Infinity,
            maxAssetSize: 10 * 6, // 1mb
        },
        devServer: {
            contentBase: path.join(__dirname, './dist'),
            compress: true,
            port: 9000,
            stats: {
                assetsSort: 'name',
                children: false,
                modules: false,
            },
        },
        stats: {
            assetsSort: 'name',
            children: false,
            modules: false,
        },
    };
};
