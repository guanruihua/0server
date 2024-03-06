import { ObjectType } from 'abandonjs'
import { genFile } from './utils'
import { DB, initDB } from './database'

initDB()

export function gen() {
  return DB.templateList
}

export async function getFile(params: ObjectType<string>) {
  return await genFile(params)
}
