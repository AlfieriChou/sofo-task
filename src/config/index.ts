import * as development from './default.config'
import * as release from './release.config'
import * as prod from './prod.config'
import * as _ from 'lodash'
const env: string = process.env.NODE_ENV || 'development'
const configs: Object = {
  development: development.config,
  production: prod.config,
  release: release.config
}

const defaultConfig: Object = {
  env: env,
  appRoot: process.env.PWD
}
export interface Config {
    env?: string
    appRoot?: string
    port: number
    mysql: Mysql
  }
  
interface Mysql {
    host: string
    user: string
    password: string
    database: string
}  
export let config: Config
config = _.merge(defaultConfig, configs[env])
