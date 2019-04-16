import { Config } from '../../type'
import { config } from '../../config'
import { ApiErrorException } from './exception'

export class BaseService {
  config: Config
  constructor() {
    this.config = config
  }

  public error(code: number, message: string): void {
    throw new ApiErrorException(message, code)
  }
}
