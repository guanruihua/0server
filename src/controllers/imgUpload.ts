import { type ObjectType } from 'abandonjs'
import { mock } from 'mock-record'
import type { Request, Response, Application } from 'express'
import express from 'express'
import multer from 'multer'
// import path from 'path'
import type { AppConfig } from '../type'

function imgUploadControllerCore(app: Application, appConfig: AppConfig = {}) {
  // const imgPath = path.join(__dirname, '../../public')
  const { imgPath } = appConfig
  if (!imgPath) {
    return
  }
  app.use('/public/', express.static(imgPath))

  // 设置 multer 的配置对象
  const storage = multer.diskStorage({
    // 3.1 存储路径
    destination: function (req, file, cb) {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif'
      ) {
        cb(null, imgPath)
      } else {
        cb({ error: '仅支持 jpg/png/gif 格式的图片！' })
      }
    },
    //  存储名称
    filename: function (req, file, cb) {
      // 将图片名称分割伪数组，用于截取图片的后缀
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

export const imgUploadController = {
  post: '/img/upload',
  // callback: imgUpload
  useApp: imgUploadControllerCore
  // useCallbackResult: false
}
