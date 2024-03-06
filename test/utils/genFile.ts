import { ObjectType } from 'abandonjs'
import { DB } from '../database'

export async function genFile(props: ObjectType<any>) {
  const { name, path } = props || {}
  const { template = {}, config = {} } = DB
  const { data, params={} } = template[path + '|' + name] || {}
  let newFile: string = data

  for(let key in params){
    const item = config[key]
    const param = params[key].trim()
    if(!item) continue
    newFile = newFile.replace(param.trim(), item)
  }

  return newFile
}
