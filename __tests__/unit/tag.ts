import * as request from 'supertest'
import { app } from '../../src/app'

describe('test tag!!', () => {
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

  test('test no paginate search!!', async done => {
    const response = await request(app.callback())
      .get('/v1/tags?user_id=1&id=1&tag=w&sort=-id')
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })

  test('test paginate search!!', async done => {
    const response = await request(app.callback())
      .get('/v1/tags?pagination=true&page=1&size=1&sort=id')
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })

  // test('test create tag and tag exist!!', async done => {
  //   const response = await request(app.callback())
  //     .post('/v1/tags')
  //     .set('authorization', 'Bearer ' + token)
  //     .send({
  //       user_id: 1,
  //       tag: 'work'
  //     })
  //   expect(response.status).toBe(500)
  //   done()
  // })

  test('test create tag!!', async done => {
    const response = await request(app.callback())
      .post('/v1/tags')
      .set('authorization', 'Bearer ' + token)
      .send({
        user_id: 1,
        tag: 'test'
      })
    id = response.body.id
    expect(response.status).toBe(200)
    done()
  })

  test('test get tag info!!', async done => {
    const response = await request(app.callback())
      .get('/v1/tags/' + id)
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })

  test('test update tag info!!', async done => {
    const response = await request(app.callback())
      .put('/v1/tags/' + id)
      .set('authorization', 'Bearer ' + token)
      .send({
        description: 'haha'
      })
    expect(response.status).toBe(200)
    done()
  })

  test('test destroy tag info!!', async done => {
    const response = await request(app.callback())
      .delete('/v1/tags/' + id)
      .set('authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
    done()
  })
})
