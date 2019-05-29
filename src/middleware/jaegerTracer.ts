import { initTracer as initJaegerTracer } from 'jaeger-client'
import * as opentracing from 'opentracing'
import { logger } from '../app/common/logger'

const initTracer = (serviceName: string) => {
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
  return initJaegerTracer(config, options)
}

const tracer = initTracer('sofo-api') as opentracing.Tracer

export const createControllerSpan = (
  method: string,
  path: string,
  headers: any
) => {
  let traceSpan: opentracing.Span

  const parentSpanContext = tracer.extract(
    opentracing.FORMAT_HTTP_HEADERS,
    headers
  )
  if (parentSpanContext) {
    traceSpan = tracer.startSpan(path, {
      childOf: parentSpanContext,
      tags: {
        [opentracing.Tags.SPAN_KIND]: opentracing.Tags.SPAN_KIND_RPC_SERVER,
        [opentracing.Tags.COMPONENT]: method
      }
    })
  } else {
    traceSpan = tracer.startSpan(path, {
      tags: {
        [opentracing.Tags.SPAN_KIND]: opentracing.Tags.SPAN_KIND_RPC_SERVER,
        [opentracing.Tags.COMPONENT]: method
      }
    })
  }
  return traceSpan
}

export const finishSpanWithResult = (
  span: opentracing.Span,
  status: Number,
  errorTag?: boolean
) => {
  span.setTag(opentracing.Tags.HTTP_STATUS_CODE, status)
  if (errorTag) {
    span.setTag(opentracing.Tags.ERROR, true)
  }
  span.finish()
}
