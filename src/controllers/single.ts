import { Request, Response } from 'express'

// eslint-disable-next-line
export function random(params: Record<string, any>, req: Request, res: Response): void {
  const randomSource = req.params[0].split(',')
  res.json({ data: randomSource[Math.floor(Math.random() * randomSource.length)] })
}

// eslint-disable-next-line
export function getParams(params: Record<string, any>, req: Request, res: Response): void {
  res.send(req.query)
}

// eslint-disable-next-line
export function postParams(params: Record<string, any>, req: Request, res: Response): void {
  res.json({ ...req.query, ...req.body })
}

export const singleController = [
  {
    get: /\/random,(.+?)$/,
    callback: random
  },
  {
    get: /\/get\/(?:vrg|virtualGet)$/,
    callback: getParams
  },
  {
    get: /\/post\/(?:vrp|virtualPost)/,
    callback: postParams
  }
]
