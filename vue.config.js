const {defineConfig} = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('fonts', path.resolve(__dirname, 'src/assets/fonts/proxima-nova'))
        config.module.rules.delete("svg");
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    loader: 'vue-svg-loader',
                },
            ],
        },
    }
})
