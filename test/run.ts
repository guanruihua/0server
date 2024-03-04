import { apiServer, loadApis, initTableApi, mock, VDao, initDictionary } from '../src'
import { read } from '0file-system'
import path from 'path'

// const dirs = read(path.resolve(__dirname, './'), { tree: true })
// console.log(dirs)

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
    return { code: '0', result: data, message: 'Successful' }
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

const dbApis = initTableApi('db', config)
// console.log(apiServer, loadApis)
apiServer({
  callback: () => loadApis(dbApis),
  port: 13000
})
