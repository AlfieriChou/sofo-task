import * as request from 'supertest'
import { app } from '../../src/app'

describe('User register!!!', () => {
  test('username min length!!', async done => {
    const response = await request(app.callback())
      .post('/v1/register')
      .send({
        username: 'a',
        password: 'dddddd',
        age: 32,
        description: 'csdsds'
      })
    expect(response.status).toBe(422)
    done()
  })

  test('username max length!!', async done => {
    const response = await request(app.callback())
      .post('/v1/register')
      .send({
        username:
          'asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
        password: 'dddddd',
        age: 32,
        description: 'csdsds'
      })
    expect(response.status).toBe(422)
    done()
  })

  test('password min length!!', async done => {
    const response = await request(app.callback())
      .post('/v1/register')
      .send({
        username: 'addd',
        password: 'dd',
        age: 32,
        description: 'csdsds'
      })
    expect(response.status).toBe(422)
    done()
  })

  test('password max length!!', async done => {
    const response = await request(app.callback())
      .post('/v1/register')
      .send({
        username: 'addd',
        password:
          'ddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
        age: 32,
        description: 'csdsds'
      })
    expect(response.status).toBe(422)
    done()
  })
})
