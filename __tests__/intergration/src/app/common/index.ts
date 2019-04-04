import { mergeDeep } from '../../../../../src/app/common'

const isNotObjectTarget: string = 'test'
const isObjectTarget: Object = {
  test: 'test'
}
const isDeepObjectTarget: Object = {
  test: {
    what: 'hello'
  }
}
const isNotObjectSource: string = 'merge'
const isObjectSource: Object = {
  sofo: 'test'
}
const isDeepObjectSource: Object = {
  test: {
    sofo: 'hello'
  }
}

describe('Test common function!!!', () => {
  test('mergeDeep target is not Object!!', done => {
    const mergeNotObjectTarget = mergeDeep(isNotObjectTarget, isNotObjectSource)
    expect(mergeNotObjectTarget).toBe('test')
    done()
  })

  test('mergeDeep source is not Object!!', done => {
    const mergeNotObjectSource = mergeDeep(isObjectTarget, isNotObjectSource)
    expect(mergeNotObjectSource).toMatchObject({
      test: 'test'
    })
    done()
  })

  test('mergeDeep target and source is normal Object', done => {
    const mergeNormalObject = mergeDeep(isObjectTarget, isObjectSource)
    expect(mergeNormalObject).toMatchObject({
      test: 'test',
      sofo: 'test'
    })
    done()
  })

  test('mergeDeep target and target is deep Object!!', done => {
    const mergeDeepObject = mergeDeep(isDeepObjectTarget, isDeepObjectSource)
    expect(mergeDeepObject).toMatchObject({
      test: {
        what: 'hello',
        sofo: 'hello'
      }
    })
    done()
  })
})
