import { read, readDir, writeFile } from '0file-system'
import path from 'path'
import { ObjectType, stringify } from 'abandonjs'
import { getParameter } from './utils'
import type { DBType } from './type'
import Constant from './Constant'

export const DB: DBType = {
  configList: [],
  config: {},
  templateList: [],
  template: {}
}
const initTemplate = () => {
  const dirs: any[] = read(path.resolve(__dirname, Constant.templatePath), { tree: true })

  const newList = dirs.map(item => {
    if (item.data) {
      const { path, name } = item
      const params = getParameter(item.data)
      item.parameter = Object.keys(params)
      DB.template[path + '|' + name] = { data: item.data, params }
    }
    return item
  })
  DB.templateList = newList
}

async function getConfig(name: string): Promise<ObjectType<string>> {
  try {
    // const config = await import(path.resolve(Constant.configPath + name))
    const config = await import(Constant.configPath + '/' + name)
    return config || {}
  } catch (error) {
    return {}
  }
}

async function initConfig() {
  const dirs: any[] = readDir(path.resolve(__dirname, Constant.configPath))
  const map: ObjectType<string> = {}
  const newList: any[] = []
  for (let i = 0; i < dirs.length; i++) {
    const name = dirs[i].split('.')[0]
    if (!name) return
    const config = await getConfig(name)
    for (let key in config) {
      map[name + '.' + key] = config[key] || ''
    }
    newList.push(config)
  }
  DB.configList = newList
  DB.config = map
}

export const initDB = () => {
  console.time('Init Template & Config')
  Promise.all([initTemplate(), initConfig()]).then(() => {
    console.timeEnd('Init Template & Config')
    writeFile('./test/db.json', stringify(DB, null, 2))
  })
}
