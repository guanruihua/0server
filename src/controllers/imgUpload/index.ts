import { type ObjectType } from 'abandonjs'
import { mock } from 'mock-record'
import type { Request, Response, Application } from 'express'

import multer from 'multer'
import path from 'path'
import { loadApis } from '../../library/loadApis'

const handlePath = dir => {
  return path.join(__dirname, './', dir)
}

// 设置 multer 的配置对象
const storage = multer.diskStorage({
  // 3.1 存储路径
  destination: function (req, file, cb) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, handlePath('../../../public'))
      // cb(null, handlePath('public/'))
    } else {
      cb({ error: '仅支持 jpg/png/gif 格式的图片！' })
    }
  },
  //  存储名称
  filename: function (req, file, cb) {
    // 将图片名称分割伪数组，用于截取图片的后缀
    console.log(file.originalname)
    const fileFormat = file.originalname.split('.')
    // 自定义图片名称
    cb(null, fileFormat[0] + '_' + mock('@uuid') + '.' + fileFormat[fileFormat.length - 1])
  }
})

// 4. 为 multer 添加配置
const multerConfig = multer({
  storage: storage
  // limits: { fileSize: 2097152 } // 2M
})

function imgUploadController(app: Application) {
  app.post(
    '/img/upload',
    multerConfig.single('file'),
    function (req: any | Request, res: Response, next) {
      res.set({
        'content-type': 'application/json; charset=utf-8'
      })
      const result: ObjectType = {
        code: req.file ? 200 : -1,
        ...(req.file || {})
      }
      res.json(result)
      next()
    }
  )
}

loadApis([
  {
    post: '/img/upload',
    // callback: imgUpload
    useApp: imgUploadController
    // useCallbackResult: false
  }
])
