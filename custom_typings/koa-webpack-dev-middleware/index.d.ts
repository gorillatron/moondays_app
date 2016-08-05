


declare module 'koa-webpack-dev-middleware' {

  import * as Webpack from 'webpack'
  import * as Koa from 'koa'

  namespace KoaWebpackDevMiddleware {

  }

  interface MiddlewareOptions {
    publicPath:String
    lazy?:boolean
  }

  function KoaWebpackDevMiddleware(compiler:Webpack.compiler.Compiler, options:MiddlewareOptions):(ctx: Koa.Context, next: () => Promise<any>) => any

  export = KoaWebpackDevMiddleware

}