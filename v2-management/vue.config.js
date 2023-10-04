const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 添加 SVG Loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { removeDimensions: true },
            { removeViewBox: false }
          ]
        }
      })

    // 添加 SVG icons
    const resolve = dir => path.join(__dirname, dir)

    config.module
      .rule('svg-icons')
      .exclude.add(resolve('src/assets/icons'))
      .end()

    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()

    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 添加 Gzip 压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compression').use(CompressionPlugin, [
        {
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.json$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        }
      ])
    }
  }
})
