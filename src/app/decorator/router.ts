import * as Router from 'koa-router'
import * as dir from 'dir_filenames'
import { resolve } from 'path'
import { Middleware } from '../../type'
import { mergeDeep } from '../common'

const router = new Router()

type Prefix = (
  path: string
) => (target: any, _key?: string | symbol, _descriptor?: any) => void

type Route = (
  path: string,
  method: Method,
  ...middleware: Array<Middleware>
) => (target: any, _key?: string | symbol, descriptor?: any) => void

export enum Method {
  GET,
  PUT,
  POST,
  DELETE
}

let swagger = {
  openapi: '3.0.0',
  info: {
    title: 'SOFO API document',
    version: 'v3',
    description: 'sofo api document',
    contact: {
      name: 'AlfieriChou',
      email: 'alfierichou@gmail.com',
      url: 'https://github.com/AlfieriChou'
    }
  },
  paths: {},
  components: {
    schemas: {}
  }
}

interface FieldProperty {
  type: string
  format?: string
  description: string
}

export const property = (field: FieldProperty) => {
  return (target: any, key: string, _descriptor?: any): void => {
    const model = {
      type: 'object',
      properties: {}
    }
    const components = {}
    model.properties[key] = field
    const modelName = target.constructor.name
    components[modelName] = model
    swagger.components.schemas = mergeDeep(
      swagger.components.schemas,
      components
    )
  }
}

interface Property {
  [s: string]: Field
}

interface Field {
  type: string
  comment: string
}

interface SwaggerInfo {
  method: string
  path: string
  tags: string[]
  summary?: string
  params?: Property
  query?: Property
  requestBody?: RequestBody
  responses: Object
}

interface RequestBody {
  body: Property
  required?: string[]
}

let methods: any[] = []

export const swaggerInfo = (sinfo: SwaggerInfo) => {
  return (_target: any, _key?: string | symbol, _descriptor?: any): void => {
    const content = {
      tags: sinfo.tags,
      summary: sinfo.summary || '',
      responses: sinfo.responses
    }
    if (sinfo.query) {
      let parameters: Object[] = []
      for (let i in sinfo.query) {
        parameters.push({
          name: i,
          in: 'query',
          description: sinfo.query[i].comment,
          schema: {
            type: sinfo.query[i].type
          },
          required: false
        })
      }
      content['parameters'] = parameters
    }
    if (sinfo.params) {
      let parameters: Object[] = []
      for (let i in sinfo.params) {
        parameters.push({
          name: i,
          in: 'path',
          description: sinfo.params[i].comment,
          schema: {
            type: sinfo.params[i].type
          },
          required: true
        })
      }
      content['parameters'] = parameters
    }
    if (sinfo.requestBody) {
      const schema = {
        type: 'object',
        properties: {},
        required: sinfo.requestBody.required
      }
      for (let i in sinfo.requestBody.body) {
        schema.properties[i] = {
          type: sinfo.requestBody.body[i].type,
          description: sinfo.requestBody.body[i].comment
        }
      }
      content['requestBody'] = {
        required: true,
        content: {
          'application/json': {
            schema: schema
          }
        }
      }
    }
    let swaggerMethod = {}
    swaggerMethod[sinfo.method] = content
    let swaggerPath = {}
    swaggerPath[sinfo.path] = swaggerMethod
    methods.push(swaggerPath)
  }
}

export const prefix: Prefix = (path: string = '') => {
  return (target: any, _key?: string | symbol, _descriptor?: any): void => {
    prefixUpdateRoute(target, path)
  }
}

export const route: Route = (
  path: string,
  method: Method,
  ...middleware: Array<Middleware>
) => {
  return (target: any, _key?: string | symbol, descriptor?: any): void => {
    routeUpdate(target, method, path, descriptor, ...middleware)
  }
}

const prefixUpdateRoute = (target: any, path: string): void => {
  if (!target.prototype.router) {
    target.prototype.router = new Router()
  }
  router.use(path, target.prototype.router.routes())
  router.use(path, target.prototype.router.allowedMethods())
}

const routeUpdate = (
  target: any,
  method: Method,
  path: string,
  descriptor?: any,
  ...middleware: Array<Middleware>
) => {
  if (!target.router) {
    target.router = new Router()
  }
  switch (method) {
    case Method.GET:
      target.router.get(path, ...middleware, descriptor.value)
      break
    case Method.PUT:
      target.router.put(path, ...middleware, descriptor.value)
      break
    case Method.POST:
      target.router.post(path, ...middleware, descriptor.value)
      break
    case Method.DELETE:
      target.router.del(path, ...middleware, descriptor.value)
      break
    default:
      throw new Error('@route decorator "method" is not valid')
  }
}

export const loadControllers = () => {
  const files: string[] = dir(resolve(__dirname, '../controller'))
  files.map(file => {
    require(file)
  })
  let mergeMethod = {}
  for (let i = 0; i < methods.length; ++i) {
    mergeMethod = mergeDeep(mergeMethod, methods[i])
  }
  swagger.paths = mergeMethod
  router.get('/v1/swagger.json', async ctx => {
    ctx.body = swagger
  })
  router.get('/v1/apidoc', async ctx => {
    await ctx.render('index.html', { url: '/v1/swagger.json' })
  })
  return router
}
