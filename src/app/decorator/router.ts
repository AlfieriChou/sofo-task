import * as Router from 'koa-router'
import * as dir from 'dir_filenames'
import { resolve } from 'path'
import { Middleware } from '../../type'
import { mergeDeep } from '../common'
import * as OpenApi from 'openapi3-ts'

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

let swagger: OpenApi.OpenAPIObject = {
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
  type: swaggerTypes
  format?: swaggerFormats
  enum?: string[]
  description: string
}

export enum swaggerTypes {
  integer = 'integer',
  number = 'number',
  string = 'string',
  boolean = 'boolean'
}

export enum swaggerFormats {
  int32 = 'int32',
  int64 = 'int64',
  float = 'float',
  double = 'double',
  byte = 'byte',
  binary = 'binary',
  date = 'date',
  datetime = 'date-time',
  password = 'password',
  uuid = 'uuid'
}

let schemas: OpenApi.SchemaObject
if (swagger.components && swagger.components.schemas) {
  schemas = swagger.components.schemas
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
    schemas = mergeDeep(schemas, components)
  }
}

interface Property {
  [s: string]: FieldProperty
}

interface SwaggerInfo {
  method: string
  path: string
  tags: string[]
  summary?: string
  params?: Property
  query?: Property
  requestBody?: RequestBody
  response?: Response
}

interface RequestBody {
  body: Property
  required?: string[]
}

interface Response {
  status: number
  description?: string
  res_type?: string
  schema?: string
  paginate?: boolean
}

let methods: OpenApi.PathItemObject[] = []

export const swaggerInfo = (sinfo: SwaggerInfo) => {
  return (_target: any, _key?: string | symbol, _descriptor?: any): void => {
    const content: OpenApi.PathObject = {
      tags: sinfo.tags,
      summary: sinfo.summary || '',
      responses: {}
    }
    if (sinfo.query) {
      let parameters: OpenApi.ParameterObject[] = []
      for (let i in sinfo.query) {
        parameters.push({
          name: i,
          in: 'query',
          description: sinfo.query[i].description,
          schema: {
            type: sinfo.query[i].type
          },
          required: false
        })
      }
      content.parameters = parameters
    }
    if (sinfo.params) {
      let parameters: OpenApi.ParameterObject[] = []
      for (let i in sinfo.params) {
        parameters.push({
          name: i,
          in: 'path',
          description: sinfo.params[i].description,
          schema: {
            type: sinfo.params[i].type
          },
          required: true
        })
      }
      content.parameters = parameters
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
          description: sinfo.requestBody.body[i].description
        }
      }
      content.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: schema
          }
        }
      }
    }
    if (sinfo.response) {
      let resContent
      if (sinfo.response.schema && sinfo.response.res_type === 'object') {
        resContent = {
          'application/json': {
            schema: schemas[sinfo.response.schema]
          }
        }
      }
      if (sinfo.response.schema && sinfo.response.res_type === 'array') {
        if (sinfo.response.paginate) {
          resContent = {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  result: {
                    type: 'array',
                    items: schemas[sinfo.response.schema]
                  },
                  paginate: {
                    type: 'object',
                    properties: {
                      page: {
                        type: swaggerTypes.number,
                        description: '页码'
                      },
                      size: {
                        type: swaggerTypes.number,
                        description: '条数'
                      },
                      row_count: {
                        type: swaggerTypes.number,
                        description: '总数'
                      },
                      page_count: {
                        type: swaggerTypes.number,
                        description: '页码总数'
                      }
                    }
                  }
                }
              }
            }
          }
        } else {
          resContent = {
            'application/json': {
              schema: {
                type: 'array',
                items: schemas[sinfo.response.schema]
              }
            }
          }
        }
      }
      if (sinfo.response.res_type === 'number') {
        resContent = {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: { type: swaggerTypes.number, description: '返回标识' }
              }
            }
          }
        }
      }
      let responses: OpenApi.ResponsesObject = content.responses
      responses[sinfo.response.status] = {
        description: sinfo.response.description || '',
        content: resContent || {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                result: { type: swaggerTypes.string, description: '返回标识' }
              }
            }
          }
        }
      }
    }
    let swaggerMethod: OpenApi.PathObject = {}
    swaggerMethod[sinfo.method] = content
    let swaggerPath: OpenApi.PathItemObject = {}
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
  let mergeMethod: OpenApi.PathItemObject = {}
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
