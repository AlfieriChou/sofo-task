import { BaseService } from '../common/baseService'
import { knex } from '../../database'

export class TagService extends BaseService {
  async create(params) {
    const tag = await knex('sofo_tags')
      .where('tag', params.tag)
      .whereNull('deleted_at')
      .first()
    if (tag) this.error(400, '该标签已存在')
    const result = await knex('sofo_tags').insert(params)
    return result
  }

  async show(params) {
    const result = await this.exists('sofo_users', { id: params.id })
    return result
  }

  async update(params) {
    await this.exists('sofo_users', { id: params.id })
    params.updated_at = new Date()
    const result = await knex('sofo_tags')
      .where('id', params.id)
      .update(params)
    return result
  }

  async destroy(params) {
    await this.exists('sofo_users', { id: params.id })
    const result = await knex('sofo_tags')
      .where('id', params.id)
      .update({ deleted_at: new Date() })
    return result
  }
}
