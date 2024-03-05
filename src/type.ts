import type { Request, Response, Application } from 'express'
import { type Path } from 'typescript'
export { Request, Response, Application }
export interface ApiUnit {
  get?: string | RegExp
  post?: string | RegExp
  useApp?: (app: Application, appConfig?: AppConfig) => void
  callback?: (params: Record<string, any>, req: Request, res: Response) => any
  /**
   * @description 是否使用 callback 返回值做接口相应数据
   * @default true
   */
  useCallbackResult?: boolean
}

export interface AppConfig {
  imgPath?: Path | string
  [key: string]: any
}
