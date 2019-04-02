import { app } from './app'

const bootstrap = () => {
  app.listen(3000, () => {
    console.info('Application is listening port: 3000')
  })
}

bootstrap()
