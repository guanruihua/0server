import { read } from '0file-system'
import path from 'path'
import { ObjectType } from 'abandonjs'
import { genFile, getParameter } from './utils'
import type { DBType } from './type'

const Constant = {
  templatePath: './temp',
  configPath: './config/',
}

async function getConfig(name: string): Promise<ObjectType<string>> {
  try {
    const config = await import(Constant.configPath + name)
    return config || {}
  } catch (error) {
    return {}
  }
}

const DB: DBType = {
  templateList: []
}
const TemplateMap = new Map()
const initTemplate = () => {
  const dirs: any[] = read(path.resolve(__dirname, Constant.templatePath), { tree: true })
  const newList = dirs.map(item => {
    if (item.data) {
      const { path, name } = item
      const params = getParameter(item.data)
      item.parameter = Object.keys(params)
      TemplateMap.set(path + '|' + name, { data: item.data, params })
    }
    return item
  })
  DB.templateList = newList
}

initTemplate()

export function gen() {
  return DB.templateList
}

export async function getFile(params: ObjectType<string>) {
  const { name, rule, path } = params || {}
  const data = TemplateMap.get(path + '|' + name)
  if (name) {
    const rules = await getConfig(rule)
    return genFile(data, { name, rule, rules })
  }
  return 'Generate File Error'
}
