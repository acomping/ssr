
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const target = TARGET_NODE ? 'server' : 'client';
const { merge } = require("webpack-merge");


module.exports = {
    outputDir: `./dist/${target}`,
    configureWebpack: config => ({
        entry: `./entry.${target}.js`,
        target: TARGET_NODE ? 'node' : 'web',
        devtool: 'source-map',
        output: {
            libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
        },
        optimization: TARGET_NODE ? {
            splitChunks: {
                name: "manifest",
                minChunks: Infinity
            }
        } : {},
        plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
    }),
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap(options => {
                merge(options, {
                    optimizeSSR: false
                });
            });
    }
}