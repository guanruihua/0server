import express, { type Request, type Response } from 'express'

export interface ApiUnit {
  get?: string | RegExp
  post?: string | RegExp
  useApp?: (app: express.Application) => void
  callback?: (params: Record<string, any>, req: Request, res: Response) => any
  /**
   * @description 是否使用 callback 返回值做接口相应数据
   * @default true
   */
  useCallbackResult?: boolean
}