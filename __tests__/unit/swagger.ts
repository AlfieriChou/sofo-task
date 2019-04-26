import * as request from 'supertest'
import { app } from '../../src/app'

describe('swagger api test!!!', () => {
  test('get swagger.json test!!', async done => {
    const response = await request(app.callback()).get('/v1/swagger.json')
    expect(response.status).toBe(200)
    done()
  })
  test('get apidoc test!!', async done => {
    const response = await request(app.callback()).get('/v1/apidoc')
    expect(response.status).toBe(200)
    done()
  })
})
