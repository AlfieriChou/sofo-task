import { app } from './app'
import { schedule } from '@trapts/schedule'
import { resolve } from 'path'

const bootstrap = () => {
  schedule(resolve(__dirname, './schedule'))
  app.listen(3000, () => {
    console.info('Application is listening port: 3000')
  })
}

bootstrap()
