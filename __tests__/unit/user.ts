import * as request from 'supertest'
import { app } from '../../src/app'

describe('test user!!', () => {
  let token
  let id
  beforeAll(async done => {
    const response = await request(app.callback())
      .post('/v1/register')
      .send({
        username: 'ddddd',
        password: 'ddddddd',
        age: 0,
        description: 'haha'
      })
    id = response.body.id
    const responseLogin = await request(app.callback())
      .post('/v1/login')
      .send({
        username: 'ddddd',
        password: 'ddddddd'
      })
    token = responseLogin.body.token
    done()
  })

  test('test get user info!!', async done => {
    const response = await request(app.callback())
      .get('/v1/users/' + id)
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })

  test('test update user info!!', async done => {
    const response = await request(app.callback())
      .put('/v1/users/' + id)
      .set('authorization', 'Bearer ' + token)
      .send({
        description: 'haha'
      })
    expect(response.status).toBe(200)
    done()
  })

  test('test destroy user!!', async done => {
    const response = await request(app.callback())
      .delete('/v1/users/' + id)
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })
})
