import { app } from './app'
import { schedule } from '@trapts/schedule'
import { resolve } from 'path'
import { knex } from './database'

const bootstrap = () => {
  schedule(resolve(__dirname, './schedule'))

  setInterval(() => {
    Promise.resolve(knex.raw('select 1'))
  }, 10 * 60000)

  app.listen(3000, () => {
    console.info('Application is listening port: 3000')
  })
}

bootstrap()
