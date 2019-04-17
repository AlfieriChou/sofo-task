import * as request from 'supertest'
import { app } from '../../src/app'

describe('test tag!!', () => {
  let token
  beforeAll(async done => {
    const response = await request(app.callback())
      .post('/v1/login')
      .send({
        username: 'wang',
        password: 'jundasdasd'
      })
    token = response.body.token
    done()
  })

  test('test create tag!!', async done => {
    const response = await request(app.callback())
      .post('/v1/tags')
      .set('authorization', 'Bearer ' + token)
      .send({
        user_id: 1,
        tag: 'test'
      })
    expect(response.status).toBe(200)
    done()
  })

  test('test get tag info!!', async done => {
    const response = await request(app.callback())
      .get('/v1/tags/1')
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })

  test('test update tag info!!', async done => {
    const response = await request(app.callback())
      .put('/v1/tags/1')
      .set('authorization', 'Bearer ' + token)
      .send({
        description: 'haha'
      })
    expect(response.status).toBe(200)
    done()
  })
})
