import { ObjectType } from 'abandonjs'

export type DBType = {
  /**
   * 配置列表
   */
  configList: any[]
  /**
   * 配置对象
   */
  config: ObjectType<any>
  /**
   * 模板列表
   */
  templateList: any[]
  /**
   * 模板对象
   */
  template: ObjectType<any>
}