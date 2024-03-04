import { Request, Response, Application } from 'express'
import { color } from 'rh-color'
import type { ApiUnit, AppConfig } from '../type'

/**
 * @description 通过接口配置数组, 生成接口
 * @param list: ApiUnit[]
 */
export function loadApis(app: Application, list: ApiUnit[], appConfig: AppConfig = {}): void {
  list.forEach((item: ApiUnit): void => {
    const { get, post, callback, useCallbackResult = true, useApp } = item

    console.log(color(get ? 'get:' : 'post:', get ? 'Cyan' : 'Yellow'), color(get || post, 'Green'))

    try {
      if (useApp) {
        useApp(app, appConfig)
        return
      }
      if (get) {
        if (!useCallbackResult) {
          app.get(get, (req: Request, res: Response) => callback({}, req, res))
          return
        } else {
          app.get(get, (req: Request, res: Response): void => {
            res.send(callback(req.query, req, res))
          })
        }
      }

      if (post) {
        if (!useCallbackResult) {
          app.post(post, (req: Request, res: Response) => callback({}, req, res))
        } else {
          app.post(post, (req: Request, res: Response): void => {
            res.json(callback(Object.assign(req.query, req.body || {}), req, res))
          })
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  })
}
