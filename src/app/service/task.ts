import { BaseService } from '../common/baseService'
import { knex } from '../../database'

export class TaskService extends BaseService {
  async create(params) {
    params.start_at = new Date(params.start_at)
    params.end_at = new Date(params.end_at)
    const [id] = await knex('sofo_tasks').insert(params)
    params.id = id
    return params
  }
}
