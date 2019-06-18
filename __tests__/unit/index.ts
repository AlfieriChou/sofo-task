import * as request from 'supertest'
import { app } from '../../src/app'

describe('basic route tests!!!', () => {
  test('get index route test!!', async done => {
    const response = await request(app.callback()).get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello sofo task!!!')
    done()
  })
})
