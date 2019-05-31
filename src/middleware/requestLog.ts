import { Context } from 'koa'
import { logger } from '../app/common/logger'
import * as _ from 'lodash'
import * as moment from 'moment'
import { createSpan } from './jaegerTracer'

interface ReqJson {
  type: string
  req_method: string
  req_path: string
  req_time: string
  req_ip: string
  req_body: string | Object
  req_query: string | Object
  req_params: string | Object
  req_contentType: string
}

export const requestLog = () => {
  return async (ctx: Context, next) => {
    const reqSpan = createSpan(
      {
        type: 'start',
        requestId: 'API-req' + JSON.stringify(Math.random() * 10000 + 1000),
        timestamp: new Date()
      },
      ctx
    )
    const ts = moment().format('YYYY-MM-DD HH:mm:ss')
    const reqJson: ReqJson = {
      type: 'request',
      req_method: ctx.method,
      req_path: ctx.path,
      req_time: ts,
      req_ip: ctx.ip,
      req_body: _.clone(ctx.request.body) || '',
      req_query: _.clone(ctx.query) || '',
      req_params: _.clone(ctx.params) || '',
      req_contentType: ctx.get('Content-Type')
    }
    if (reqJson.req_body['password']) {
      reqJson.req_body['password'] = '******'
    }
    if (reqJson.req_params['password']) {
      reqJson.req_params['password'] = '******'
    }
    logger.info(JSON.stringify(reqJson))
    reqSpan.log({ req: JSON.stringify(reqJson) })
    await next()
  }
}
