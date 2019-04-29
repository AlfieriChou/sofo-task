import * as bunyan from 'bunyan'
import { Context } from 'koa'
import * as path from 'path'
import * as RotatingFileStream from 'bunyan-rotating-file-stream'

export const logger = bunyan.createLogger({
  name: 'sofo',
  streams: [
    {
      stream: new RotatingFileStream({
        path: path.resolve(__dirname, '../../../logs/logger.log'),
        period: '1d',
        totalFiles: 10,
        rotateExisting: true,
        threshold: '10m',
        totalSize: '20m',
        gzip: true
      })
    }
  ],
  serializers: {
    sofo: (ctx: Context) => {
      return {
        method: ctx.method,
        url: ctx.url,
        originalUrl: ctx.originalUrl,
        headers: ctx.headers
      }
    }
  }
})
