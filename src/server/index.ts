
import * as fs from 'fs'
import * as Koa from 'koa'
import * as router from 'koa-router'
import * as webpack from 'webpack'
import * as webpackDev from 'koa-webpack-dev-middleware'

const server = new Koa()

const webpackConfig:webpack.Configuration = require("../../webpack.config.js")

console.log(webpackConfig)

server.use(webpackDev(webpack(webpackConfig), {
  publicPath: "/assets/"
}))
