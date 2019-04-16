import { Config } from '../../type'
import { config } from '../../config'
import { ApiErrorException, NotFoundException } from './exception'
import { knex } from '../../database'

export class BaseService {
  config: Config
  constructor() {
    this.config = config
  }

  public error(code: number, message: string): void {
    throw new ApiErrorException(message, code)
  }

  async exists(table: string, condition: Object) {
    const exist = await knex(table)
      .where(condition)
      .first()
    if (!exist) throw new NotFoundException('Not Exists.')
    return exist
  }
}
