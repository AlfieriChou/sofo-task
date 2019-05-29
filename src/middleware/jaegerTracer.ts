import { initTracer as initJaegerTracer } from 'jaeger-client'
import * as opentracing from 'opentracing'
import { logger } from '../app/common/logger'
import * as _ from 'lodash'

const initTracer = (serviceName: string) => {
  const config = {
    serviceName: serviceName,
    sampler: {
      type: 'sofo',
      param: 1
    },
    reporter: {
      logSpans: false
    }
  }
  const options = {
    logger: {
      info: (msg: string) => {
        logger.info(msg)
      },
      error: (msg: string) => {
        logger.error(msg)
      }
    }
  }
  return initJaegerTracer(config, options)
}

const tracer = initTracer(
  'sofo-api' + '-' + process.env.NODE_ENV || ''
) as opentracing.Tracer

const sqlTracer = initTracer(
  'sofo-sql' + '-' + process.env.NODE_ENV || ''
) as opentracing.Tracer

interface Record {
  type: string
  requestId: string
  timestamp: Date
}

const getParentSpan = ctx => {
  return ctx._spans[ctx._spans.length - 1]
}

export const finishSpanAll = ctx => {
  _.each(ctx._spans, span => span.finish())
}

export const createSpan = (record: Record, ctx): opentracing.Span => {
  if (record.type === 'start') {
    ctx._spans = [] as opentracing.Span[]
  }
  const tags = {
    [opentracing.Tags.HTTP_URL]: ctx.url,
    requestId: record.requestId
  }
  const parentSpan: opentracing.Span = getParentSpan(ctx)
  let span: opentracing.Span
  if (record.type === 'sql') {
    span = sqlTracer.startSpan(ctx.path, {
      childOf: parentSpan,
      startTime: record.timestamp.getTime(),
      tags
    })
  }
  if (parentSpan) {
    span = tracer.startSpan(ctx.path, {
      childOf: parentSpan,
      startTime: record.timestamp.getTime(),
      tags
    })
  } else {
    span = tracer.startSpan(ctx.path, {
      childOf: parentSpan,
      startTime: record.timestamp.getTime(),
      tags
    })
  }
  ctx._spans.push(span)
  return span
}
