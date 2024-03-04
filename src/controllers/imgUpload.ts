import { type ObjectType } from 'abandonjs'
import type { Request, Response } from 'express'
import { loadApis } from '../library/loadApis'

export function imgUpload(params: ObjectType, req: Request, res: Response) {
  // console.log(params, req)
  console.log(req)
  // console.log(params, req.query, res)
  return '200'
}

loadApis([
	{
		post: '/img/upload',
		callback: imgUpload,
		// useCallbackResult: false
	},
])