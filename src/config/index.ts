import * as develop from './config.default'
import * as prod from './config.prod'
import * as test from './config.test'
import { Config } from '../type'

const env: string = process.env.NODE_ENV || 'development'

const configs: Object = {
  development: develop.config,
  production: prod.config,
  test: test.config
}

const defaultConfig: Object = {
  env: env
}

const mergeDeep = (target: any, source: any) => {
  const output = Object.assign({}, target)
  if (!isObject(target) || !isObject(source)) {
    return output
  }
  const keys = Object.keys(source)
  for (let key of keys) {
    if (target[key] && isObject(source[key])) {
      output[key] = mergeDeep(target[key], source[key])
      return
    }
    output[key] = source[key]
  }
  return output
}

const isObject = item => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export const config: Config = mergeDeep(defaultConfig, configs[env])
