import { Config } from '../../type'
import { config } from '../../config'
import { ApiErrorException, NotFoundException } from './exception'
import { knex } from '../../database'

interface OrderBy {
  column: string
  order: string
}

export class BaseService {
  config: Config
  constructor() {
    this.config = config
  }

  public error(code: number, message: string): void {
    throw new ApiErrorException(message, code)
  }

  public paginate(count: number, page: number, size: number) {
    return {
      page: +page,
      size: +size,
      row_count: count,
      page_count: Math.ceil(count / size)
    }
  }

  public getSort(option: string) {
    let result: OrderBy[] = []
    let options = option.split(',')
    options.map(item => {
      let orderObj = {}
      orderObj['column'] =
        item.startsWith('-') || item.startsWith('+') ? item.substring(1) : item
      orderObj['order'] = item.startsWith('-') ? 'desc' : 'asc'
      result.push(<OrderBy>orderObj)
    })
    return result
  }

  async exists(table: string, condition: Object) {
    const exist = await knex(table)
      .where(condition)
      .first()
    if (!exist) throw new NotFoundException('Not Exists.')
    return exist
  }
}
