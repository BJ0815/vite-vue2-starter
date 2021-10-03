const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const resolve = (dir) => path.join(__dirname, '.', dir)
const inProductionMode = process.env.NODE_ENV === 'production'
require('dotenv').config({ path: resolve('config/.env') })

module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: resolve(`dist/${process.env.PROJECT_NAME}`),
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    // 編譯錯誤時瀏覽器overlay顯示警告和錯誤
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: !inProductionMode,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @use "@/assets/style/abstract/_index.scss" as *;
        `
      },
      postcss: {
        plugins: [
          require('autoprefixer')({
            grid: 'autoplace'
          })
        ]
      }
    }
  },
  configureWebpack: (config) => {
    const customConfig = {
      plugins: [
        new StyleLintPlugin({
          files: ['src/**/*.{vue,scss}']
        })
      ],
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      optimization: {}
    }

    if (inProductionMode) {
      // 如有動態param請完整定義在這裡
      // eg. `/user/:id` -> `/user/alex`
      const renderRoutes = [
        '/'
      ]

      const prerender = new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: resolve('dist'),
        outputDir: resolve(`dist/${process.env.PROJECT_NAME}`),
        indexPath: resolve(`dist/${process.env.PROJECT_NAME}/index.html`),
        // Required - Routes to render.
        routes: renderRoutes,
        renderer: new Renderer({
          // -> 打事件決定渲染時機
          // renderAfterDocumentEvent: 'render-event',
          injectProperty: '__PRERENDER_PROCESSING',
          inject: true,
          headless: true
        })
      })

      customConfig.plugins.push(prerender)

      // 壓縮 css
      customConfig.optimization.minimize = true
      customConfig.optimization.minimizer = [new CssMinimizerPlugin()]

      // gzip
      customConfig.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/,
          threshold: 10240,
          deleteOriginalAssets: false
        })
      )
    }

    return customConfig
  }
}
