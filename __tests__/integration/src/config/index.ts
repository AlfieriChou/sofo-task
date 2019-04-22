import { config } from '../../../../src/config/index'

describe('Test config!!!', () => {
  test('config property!!', done => {
    expect(config).toHaveProperty('env', 'test')
    expect(config).toHaveProperty('mysql')
    expect(config).toHaveProperty('redis')
    expect(config.mysql).toHaveProperty('host')
    expect(config.mysql).toHaveProperty('user')
    expect(config.mysql).toHaveProperty('password')
    expect(config.mysql).toHaveProperty('database', 'test')
    expect(config.redis).toHaveProperty('host')
    expect(config.redis).toHaveProperty('port')
    done()
  })
})
