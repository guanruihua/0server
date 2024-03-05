import { apiServer, initTableApi, mock, VDao } from '../src'
import path from 'path'
import { gen, getFile } from './gen'

const config = {
  vDao: new VDao(),
  queryPage: {
    total: 'totalCount'
  },
  locale: {
    lang: 'localeStr',
    langs: ['zh_CN', 'en_US', 'zh_TW'],
    fields: ['desc']
  },
  baseUrl: '/vr/',
  analysisParams: (data: Record<string, any>) => {
    return { code: '0', data, message: 'Successful' }
  }
}

const db = mock({
  'list|30-50|': {
    id: '@id',
    uid: '@uuid',
    type: '@name',
    maxLength: '@num(10,20)',
    'desc||zh_CN,en_US,zh_TW|stringify': '@name',
    shortURL: '@num(1,2)'
  }
})
config.vDao.init('db', db.list)

const dbApis = [
  {
    get: '/vr/gen/query',
    callback: gen
  },
  {
    get: '/vr/gen/genFile',
    callback: getFile
  },
  ...initTableApi('db', config)
]

apiServer({
  apis: dbApis,
  port: 13000,
  imgPath: path.resolve(__dirname, './public')
})
