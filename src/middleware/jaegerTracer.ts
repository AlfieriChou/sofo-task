import * as jaeger from 'jaeger-client'
import * as opentracing from 'opentracing'
import { logger } from '../app/common/logger'
import * as _ from 'lodash'
import { Context } from 'koa'

interface Record {
  type: string
  requestId: string
  timestamp: Date
}

export class JaegerTracer {
  tracer: opentracing.Tracer
  constructor(tracerName: string) {
    this.tracer = this.initTracer(tracerName)
  }

  private initTracer(serviceName: string): opentracing.Tracer {
    const config = {
      serviceName: serviceName,
      sampler: {
        type: 'const',
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
    return jaeger.initTracer(config, options)
  }

  finishSpanAll(ctx: Context) {
    _.each(ctx._spans, span => span.finish())
  }

  private getLastSpan(ctx: Context) {
    return ctx._spans[ctx._spans.length - 1]
  }

  public createSpan(record: Record, ctx: Context) {
    if (record.type === 'start') {
      ctx._spans = [] as opentracing.Span[]
    }
    const tags = {
      [opentracing.Tags.HTTP_URL]: ctx.url,
      requestId: record.requestId
    }
    const parentSpan: opentracing.Span = this.getLastSpan(ctx)
    let span: opentracing.Span
    if (parentSpan) {
      span = this.tracer.startSpan(ctx.path, {
        childOf: parentSpan,
        startTime: record.timestamp.getTime(),
        tags
      })
    } else {
      span = this.tracer.startSpan(ctx.path, {
        childOf: parentSpan,
        startTime: record.timestamp.getTime(),
        tags
      })
    }

    if (record.type === 'error') {
      span = this.tracer.startSpan(ctx.path, {
        childOf: parentSpan,
        startTime: record.timestamp.getTime()
      })
      span.setTag(jaeger.opentracing.Tags.ERROR, true)
    }
    ctx._spans.push(span)
    return span
  }
}
