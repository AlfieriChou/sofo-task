import * as request from 'supertest'
import { app } from '../../src/app'

describe('User login!!!', () => {
  test('username min length!!', async done => {
    const response = await request(app.callback())
      .post('/v1/login')
      .send({
        username: 'a',
        password: 'dddddd'
      })
    expect(response.status).toBe(422)
    done()
  })

  test('username max length!!', async done => {
    const response = await request(app.callback())
      .post('/v1/login')
      .send({
        username: 'asssssssssssssssssssssssssss',
        password: 'dddddd'
      })
    expect(response.status).toBe(422)
    done()
  })

  test('password min length!!', async done => {
    const response = await request(app.callback())
      .post('/v1/login')
      .send({
        username: 'addd',
        password: 'dd'
      })
    expect(response.status).toBe(422)
    done()
  })

  test('password max length!!', async done => {
    const response = await request(app.callback())
      .post('/v1/login')
      .send({
        username: 'addd',
        password:
          'ddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
      })
    expect(response.status).toBe(422)
    done()
  })

  test('username login!!', async done => {
    const response = await request(app.callback())
      .post('/v1/login')
      .send({
        username: 'abc',
        password: 'dddddd'
      })
    expect(response.status).toBe(200)
    done()
  })
})
