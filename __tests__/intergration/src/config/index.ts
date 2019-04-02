import { config } from '../../../../src/config/index'

describe('Test config!!!', () => {
  test('config property!!', done => {
    expect(config).toHaveProperty('env', 'test')
    expect(config).toHaveProperty('mysql')
    done()
  })
})
