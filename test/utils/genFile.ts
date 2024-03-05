import { ObjectType } from 'abandonjs'

export function genFile(file: ObjectType<any>, config: ObjectType<string | any>) {
  const { data = '', params } = file
  const { rules } = config
  let newFile: string = data
  Object.keys(params).forEach(key => {
    const [, newKey] = key.split(/,|\./)
    const newVal = rules[newKey] || ''
    newFile = newFile.replace(params[key].trim(), newVal + (key.includes(',') ? ',' : ''))
  })
  return newFile
}
