import { Context } from 'koa'
import { JaegerTracer } from './jaegerTracer'
import { logger } from '../app/common/logger'
import * as errStackParser from 'error-stack-parser'
import * as moment from 'moment'
import * as _ from 'lodash'
import * as chalk from 'chalk'

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

export const responseLog = () => {
  return async (ctx: Context, next) => {
    const logQueries = () => {
      ctx.queries.forEach((query, i) => {
        if (process.env.NODE_ENV === 'development') {
          const color = chalk['cyan']
          console.log(
            '%s %s %s %s',
            chalk['gray']('SQL'),
            color(query['sql']),
            chalk['gray']('{' + query['bindings'].join(', ') + '}'),
            chalk['magenta'](query['duration'] + 'ms')
          )
        }
        logger.info(
          JSON.stringify({
            sql: query['sql'],
            duration: query['duration'] + 'ms'
          })
        )
        ctx._spans[i + 1].log({
          sql: query['sql'],
          condition: '{' + query['bindings'].join(', ') + '}',
          duration: query['duration'] + 'ms'
        })
      })
    }
    try {
      await next()
      logQueries()
      const jaeger = new JaegerTracer('sofo-res-' + process.env.NODE_ENV || '')
      const resSpan = jaeger.createSpan(
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
      jaeger.finishSpanAll(ctx)
    } catch (err) {
      const jaeger = new JaegerTracer('sofo-res-' + process.env.NODE_ENV || '')
      const resSpan = jaeger.createSpan(
        {
          type: 'error',
          requestId: 'API-res' + JSON.stringify(Math.random() * 10000 + 1000),
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
      jaeger.finishSpanAll(ctx)
      throw err
    }
  }
}
