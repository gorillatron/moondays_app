
import * as fs from 'fs'
import * as Koa from 'koa'
import * as router from 'koa-router'
import * as webpack from 'webpack'
import * as webpackDev from 'koa-webpack-dev-middleware'
import moondays from 'moondays'

const server = new Koa()

const webpackConfig:webpack.Configuration = require("../../webpack.config.js")

console.log(moondays({startDate: Date.now(), count: 10}))

server.use(webpackDev(webpack(webpackConfig), {
  lazy: false,
  publicPath: "/assets/"
}))

server.use((ctx) => {
  ctx.body = `
   <html>
    <head>
      <style>

        html, body, app {
          height: 100%;
          width: 100%;
        }

      
      </style>
    </head>
    <body>
      <div id="app"></div>
      <script src="/assets/bundle.js"></script>
    </body>
   </html>
  `
})

server.listen(3000)