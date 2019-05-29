import { initTracer as initJaegerTracer } from 'jaeger-client'
import * as opentracing from 'opentracing'

const initTracer = (serviceName: string) => {
  const config = {
    serviceName: serviceName,
    sampler: {
      type: 'const',
      param: 1
    },
    reporter: {
      logSpans: false // this logs whenever we send a span
    }
  }
  const options = {
    logger: {
      info: (msg: string) => {
        console.log('INFO  ', msg)
      },
      error: (msg: string) => {
        console.log('ERROR ', msg)
      }
    }
  }
  return initJaegerTracer(config, options)
}

export const tracer = initTracer('sofo-api') as opentracing.Tracer

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
