
import * as fs from 'fs'
import * as Koa from 'koa'
import * as router from 'koa-router'
import * as webpack from 'webpack'
import * as webpackDev from 'koa-webpack-dev-middleware'

const server = new Koa()

const webpackConfig:webpack.Configuration = require("../../webpack.config.js")

server.use(webpackDev(webpack(webpackConfig), {
  lazy: false,
  publicPath: "/assets/"
}))

server.use((ctx) => {
  ctx.body = `
   <html>
    <head>
    </head>
    <body>
      <div id="app"></div>
      <script src="/assets/bundle.js"></script>
    </body>
   </html>
  `
})

server.listen(3000)