import * as request from 'supertest'
import { app } from '../../src/app'

describe('test task!!', () => {
  let token
  let id
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

  test('test create task!!', async done => {
    const response = await request(app.callback())
      .post('/v1/tasks')
      .set('authorization', 'Bearer ' + token)
      .send({
        user_id: 1,
        tag_id: 1,
        content: 'dlsadjlasjda',
        start_at: '2019-04-18T09:25:43.511Z',
        end_at: '2019-04-18T10:25:43.511Z'
      })
    id = response.body.id
    expect(response.status).toBe(200)
    done()
  })

  test('test get task info!!', async done => {
    const response = await request(app.callback())
      .get('/v1/tasks/' + id)
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })

  test('test update task info!!', async done => {
    const response = await request(app.callback())
      .put('/v1/tasks/' + id)
      .set('authorization', 'Bearer ' + token)
      .send({
        content: 'hahahaha'
      })
    expect(response.status).toBe(200)
    done()
  })

  test('test destroy task info!!', async done => {
    const response = await request(app.callback())
      .delete('/v1/tasks/' + id)
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })
})
