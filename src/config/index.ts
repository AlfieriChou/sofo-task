import * as develop from './config.default'
import * as prod from './config.prod'
import * as test from './config.test'
import { Config } from '../type'
import { mergeDeep } from '../app/common'

const env: string = process.env.NODE_ENV || 'development'

const configs: Object = {
  development: develop.config,
  production: prod.config,
  test: test.config
}

const defaultConfig: Object = {
  env: env
}

export const config: Config = mergeDeep(defaultConfig, configs[env])
