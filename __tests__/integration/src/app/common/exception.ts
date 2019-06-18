import {
  ApiErrorException,
  RuntimeException,
  RestrictedAccessException,
  NotAuthorizedException,
  NotFoundException,
  DataValidationException,
  NotImplementedException,
  Exception
} from '../../../../../src/app/common/exception'

describe('Test exception!!!', () => {
  test('test Exception getCode and getMessage!!', async done => {
    expect(new Exception('test', 400).getCode()).toBe(400)
    expect(new Exception('test', 400).getMessage()).toBe('test')
    done()
  })

  test('test ApiErrorException!!', async done => {
    const t = () => {
      throw new ApiErrorException('test', 400)
    }
    expect(t).toThrow(Exception)
    done()
  })

  test('test RuntimeException!!', async done => {
    const t = () => {
      throw new RuntimeException('test')
    }
    expect(t).toThrow(Exception)
    done()
  })

  test('test RestrictedAccessException!!', async done => {
    const t = () => {
      throw new RestrictedAccessException('test')
    }
    expect(t).toThrow(Exception)
    done()
  })

  test('test NotAuthorizedException!!', async done => {
    const t = () => {
      throw new NotAuthorizedException('test')
    }
    expect(t).toThrow(Exception)
    done()
  })

  test('test NotFoundException!!', async done => {
    const t = () => {
      throw new NotFoundException('test')
    }
    expect(t).toThrow(Exception)
    done()
  })

  test('test DataValidationException!!', async done => {
    const t = () => {
      throw new DataValidationException('test')
    }
    expect(t).toThrow(Exception)
    done()
  })

  test('test NotImplementedException!!', async done => {
    const t = () => {
      throw new NotImplementedException('test')
    }
    expect(t).toThrow(Exception)
    done()
  })
})
