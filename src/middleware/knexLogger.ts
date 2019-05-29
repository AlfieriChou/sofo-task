import * as chalk from 'chalk'
import * as Knex from 'knex'

export const knexLogger = (knex: Knex) => {
  return async (ctx, next) => {
    const queries: Knex.QueryBuilder[] = []

    const captureQueries = (builder: Knex) => {
      const startTime = process.hrtime()
      const group: Knex.QueryBuilder[] = []

      builder.on('query', (query: Knex.QueryBuilder) => {
        group.push(query)
        queries.push(query)
      })

      builder.on('end', () => {
        const diff = process.hrtime(startTime)
        const ms: number = diff[0] * 1e3 + diff[1] * 1e-6
        group.forEach(query => {
          query['duration'] = ms.toFixed(3)
        })
      })
    }

    const logQueries = () => {
      queries.forEach(query => {
        const color = chalk['cyan']
        console.log(
          '%s %s %s %s',
          chalk['gray']('SQL'),
          color(query['sql']),
          chalk['gray']('{' + query['bindings'].join(', ') + '}'),
          chalk['magenta'](query['duration'] + 'ms')
        )
        ctx.span.log({
          sql: query['sql'] + ': ' + query['duration'] + 'ms'
        })
      })
    }

    knex.client.on('start', captureQueries)
    await next()
    knex.client.removeListener('start', captureQueries)
    logQueries()
  }
}
