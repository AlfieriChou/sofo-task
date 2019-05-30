import * as Knex from 'knex'
import { createSpan } from './jaegerTracer'

export const knexLogger = (knex: Knex) => {
  return async (ctx, next) => {
    const queries: Knex.QueryBuilder[] = []
    const group: Knex.QueryBuilder[] = []
    ctx.queries = queries
    ctx.group = group

    const captureQueries = (builder: Knex) => {
      const startTime = process.hrtime()

      builder.on('query', (query: Knex.QueryBuilder) => {
        createSpan(
          {
            type: 'sql',
            requestId: 'SQL' + JSON.stringify(Math.random() * 10000 + 1000),
            timestamp: new Date()
          },
          ctx
        )
        ctx.group.push(query)
        ctx.queries.push(query)
      })

      builder.on('end', () => {
        const diff = process.hrtime(startTime)
        const ms: number = diff[0] * 1e3 + diff[1] * 1e-6
        group.forEach(query => {
          query['duration'] = ms.toFixed(3)
        })
      })
    }

    knex.client.on('start', captureQueries)
    await next()
    knex.client.removeListener('start', captureQueries)
  }
}
