import { HOST, PORT } from './config'
import { color } from 'rh-color'
import { App } from './app'
import { type ObjectType } from 'abandonjs'
import { isEffectArray } from 'asura-eye'
import { loadApis } from './loadApis'
import { BuiltInController } from '../controllers'
import { type AppConfig } from '../type'

export function apiServer(params?: ObjectType<any> & AppConfig): void {
  const { host = HOST, port = PORT, callback, apis, useBuiltIn = true, ...appConfig } = params || {}
  const { app, appConfig: myAppConfig } = new App(appConfig)
  callback && callback(app)
  if (isEffectArray(apis)) {
    loadApis(app, apis, myAppConfig)
  }
  if (useBuiltIn) {
    loadApis(app, BuiltInController, myAppConfig)
  }
  app.listen(port, host, () => {
    console.log(
      color(`listening at http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`, 'Grey')
    )
  })
}
