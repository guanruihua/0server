import express, { Request, Response } from 'express'
import bodyParser, { json, urlencoded } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import type { AppConfig } from '../type'

export class App {
  public app: express.Application
  public appConfig?: AppConfig
  constructor(config: AppConfig = {}) {
    this.app = express()
    this.appConfig = config
    this.app.get('/', (req: Request, res: Response) => {
      res.send({ message: 'Hello 0server ' })
    })
  }
  private config() {
    //开启 cors
    this.app.use(cors())
    //支持  application/json类型 发送数据
    this.app.use(json())
    //支持 application/x-www-form-urlencoded 发送数据
    // this.app.use(urlencoded({ extended: false }))
    this.app.use(urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.all('*', function (req: Request, res: Response, next: any): void {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Content-Type')
      res.header('Access-Control-Allow-Methods', '*')
      // res.header('Content-Type', 'application/json;charset=utf-8')
      next()
    })

    //日志中间件
    this.app.use(
      morgan(function (tokens: any, req: Request, res: Response): any {
        const url: string = tokens.url(req, res)
        if (url.indexOf('/sockjs-node/info?t=') > -1) {
          return
        }
        return [
          `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(
            req,
            res
          )} content-length: ${tokens.res(req, res, 'content-length')} - ${tokens['response-time'](
            req,
            res
          )}ms`
        ]
      })
    )
  }
}
