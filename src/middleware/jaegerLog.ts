import { Context } from 'koa'
import { logger } from '../app/common/logger'
import * as _ from 'lodash'
import * as moment from 'moment'
import { createSpan, finishSpanAll } from './jaegerTracer'
import * as errStackParser from 'error-stack-parser'

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

interface ResJson {
  type: string
  req_method: string
  req_path: string
  req_time: string
  req_ip: string
  req_body: string | Object
  req_query: string | Object
  req_params: string | Object
  req_contentType: string
  res_status: string | number
  res_message: string
}

const logRes = (ctx: Context) => {
  const ts = moment().format('YYYY-MM-DD HH:mm:ss')
  const resJson: ResJson = {
    type: 'response',
    req_method: ctx.method,
    req_path: ctx.path,
    req_time: ts,
    req_ip: ctx.ip,
    req_body: _.clone(ctx.request.body) || '',
    req_query: _.clone(ctx.query) || '',
    req_params: _.clone(ctx.params) || '',
    req_contentType: ctx.get('Content-Type'),
    res_status: '',
    res_message: ''
  }
  if (ctx.status) {
    resJson.res_status = ctx.status
  }
  if (resJson.req_body['password']) {
    resJson.req_body['password'] = '******'
  }
  if (resJson.req_params['password']) {
    resJson.req_params['password'] = '******'
  }
  return resJson
}

export const requestLog = () => {
  return async (ctx: Context, next) => {
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
    const reqSpan = createSpan(
      {
        type: 'start',
        requestId: 'API' + JSON.stringify(Math.random() * 10000 + 1000),
        timestamp: new Date()
      },
      ctx
    )
    logger.info(JSON.stringify(reqJson))
    reqSpan.log({ req: JSON.stringify(reqJson) })
    try {
      await next()
    } catch (err) {
      const resSpan = createSpan(
        {
          type: 'end',
          requestId: 'API' + JSON.stringify(Math.random() * 10000 + 1000),
          timestamp: new Date()
        },
        ctx
      )
      const errArr = errStackParser.parse(err)
      const resJson = logRes(ctx)
      resJson.res_status = err.code || err.status || 500
      resJson.res_message = err.message || ''
      logger.error(JSON.stringify(resJson))
      resSpan.log({
        errStatus: resJson.res_status,
        resMessage: resJson.res_message,
        fn: errArr[0].functionName,
        filename: errArr[0].fileName
      })
      finishSpanAll(ctx)
      throw err
    }
    const resSpan = createSpan(
      {
        type: 'end',
        requestId: 'API' + JSON.stringify(Math.random() * 10000 + 1000),
        timestamp: new Date()
      },
      ctx
    )
    const resJson = logRes(ctx)
    logger.info(JSON.stringify(resJson))
    resSpan.log({ res: JSON.stringify(resJson) })
    finishSpanAll(ctx)
  }
}
