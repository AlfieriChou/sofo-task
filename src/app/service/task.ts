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

  async show(params) {
    const result = await this.exists('sofo_tasks', { id: params.id })
    return result
  }

  async update(params) {
    await this.exists('sofo_tasks', { id: params.id })
    params.updated_at = new Date()
    const result = await knex('sofo_tasks')
      .where('id', params.id)
      .update(params)
    return result
  }

  async destroy(params) {
    await this.exists('sofo_tasks', { id: params.id })
    const result = await knex('sofo_tasks')
      .where('id', params.id)
      .update({
        deleted_at: new Date()
      })
    return result
  }
}
