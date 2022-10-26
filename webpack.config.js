const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const tsconfigAlias = require('./tsconfig.alias.json')


module.exports = {
    entry: {
        main: resolve(__dirname, './src/index.ts'),
    },
    output: {
        path: resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: resolve(__dirname, './src/template.html'),
            filename: 'index.html',
        }),
        new ESLintPlugin({
            emitError: true,
            emitWarning: true,
            failOnError: true,
            extensions: ['.ts', '.tsx', '.js']
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                include: resolve(__dirname, 'src'),
                exclude: /node_modules/,
                options: {
                    loader: 'tsx',
                    target: 'es2015'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                include: resolve(__dirname, 'src/assets'),
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        symlinks: false,
        extensions: ['.ts', '.tsx', '.js'],
        alias: Object.entries(tsconfigAlias.compilerOptions.paths).reduce((acc, entry) => {
            const [key, value] = entry
            acc[key.replace('/*', '')] = resolve(__dirname, value[0].replace('*', ''))
            return acc
        }, {})
    }
}