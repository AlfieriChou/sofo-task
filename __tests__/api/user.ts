import * as request from 'supertest'
import { app } from '../../src/app'

describe('test user!!', () => {
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

  test('test get user info!!', async done => {
    const response = await request(app.callback())
      .get('/v1/users/1')
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })

  test('test update user info!!', async done => {
    const response = await request(app.callback())
      .put('/v1/users/1')
      .set('authorization', 'Bearer ' + token)
      .send({
        description: 'haha'
      })
    expect(response.status).toBe(200)
    done()
  })
})
