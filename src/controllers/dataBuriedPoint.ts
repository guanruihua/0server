import { Request, Response } from 'express'
import { createCanvas } from 'canvas'
import { ObjectType } from 'abandonjs'
/**
 * @description: Data buried point 数据埋点 集合
 */
export const DataBuriedPoint: (ObjectType | any)[] = []

/**
 * @description: Data buried point 数据埋点 集合
 */
// eslint-disable-next-line
export function dataBuriedPoint(params: ObjectType, req: Request, res: Response): void {
  const query = req.query || {}
  if (query && !(JSON.stringify(query) === '{}')) {
    DataBuriedPoint.push(query)
  }
  const canvas: any = createCanvas(1, 1)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, 1, 1)

  res.setHeader('Content-Type', `image/png`)
  canvas.pngStream().pipe(res)
}

/**
 * @description: 获取 Data buried point 数据埋点
 */
// eslint-disable-next-line
export function getDataBuriedPoint(
  params: Record<string, any>,
  req: Request,
  res: Response
): Record<string, any> {
  return { dataBuriedPoints: DataBuriedPoint }
}

export const dataBuriedPointController = [
  {
    get: '/dbp',
    callback: dataBuriedPoint,
    useCallbackResult: false
  },
  {
    get: '/getDBP',
    callback: getDataBuriedPoint
  }
]
