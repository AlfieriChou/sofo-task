import { mergeDeep } from '../../../../../src/app/common'

describe('merge', () => {
  it('should merge Objects and all nested Ones', () => {
    const obj1 = { a: { a1: 'A1' }, c: 'C', d: {} }
    const obj2 = { a: { a2: 'A2' }, b: { b1: 'B1' }, d: null }
    const obj3 = { a: { a1: 'A1', a2: 'A2' }, b: { b1: 'B1' }, c: 'C', d: null }
    expect(mergeDeep({}, obj1, obj2)).toEqual(obj3)
  })
  it('should behave like Object.assign on the top level', () => {
    const obj1 = { a: { a1: 'A1' }, c: 'C' }
    const obj2 = { a: undefined, b: { b1: 'B1' } }
    expect(mergeDeep({}, obj1, obj2)).toEqual(Object.assign({}, obj1, obj2))
  })
  it('should not merge array values, just override', () => {
    const obj1 = { a: ['A', 'B'] }
    const obj2 = { a: ['C'], b: ['D'] }
    expect(mergeDeep({}, obj1, obj2)).toEqual({ a: ['C'], b: ['D'] })
  })
  it('typed merge', () => {
    expect(
      mergeDeep<TestPosition>(new TestPosition(0, 0), new TestPosition(1, 1))
    ).toEqual(new TestPosition(1, 1))
  })
})

class TestPosition {
  constructor(public x: number = 0, public y: number = 0) {
    /*empty*/
  }
}
