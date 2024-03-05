import { isString } from 'asura-eye'
import { ObjectType, stringify } from 'abandonjs'

export const getParameter = (value: string): ObjectType<string> => {
  if (!isString(value)) {
    return {}
  }

  const texts = value.split('\n')
  const params: ObjectType<string> = {}

  texts.forEach(text => {
    if (!isString(text) || !text.trim().length || text.indexOf('$$') == -1) {
      return
    }
    try {
      let name: string = ''
      if (text.indexOf('//') > -1) {
        name = text.replace(/\s|\/|\$\$/gi, '')
      }

      if (text.indexOf('/*') > -1 && text.indexOf('*/')) {
        name = text
          .split(/\/\*|\*\//)[1]
          .trim()
          .replace('$$', '')
      }

      if (text.indexOf('<!--') > -1) {
        name = text.replace(/\s|\/|<!--|-->|\$\$/gi, '')
      }
      if (name) {
        params[name] = text
      }
    } catch (error) {
      return
    }
  })
  return params
}
