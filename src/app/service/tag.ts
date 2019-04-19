import { BaseService } from '../common/baseService'
import { knex } from '../../database'

export class TagService extends BaseService {
  async index(params) {
    const sql = knex('sofo_tags').whereNull('deleted_at')
    if (params.id) sql.where('id', params.id)
    if (params.user_id) sql.where('user_id', params.user_id)
    if (params.tag) sql.where('tag', 'like', `%${params.tag}%`)
    if (params.pagination) {
      const countSql = sql.clone()
      const { count } = await countSql.count('* as count').first()
      sql.offset((params.page - 1) * params.size).limit(params.size)
      const result = await sql
      const paginate = this.paginate(count, params.page, params.size)
      return {
        result: result,
        paginate: paginate
      }
    }
    const data = await sql
    return data
  }

  async create(params) {
    const tag = await knex('sofo_tags')
      .where('tag', params.tag)
      .whereNull('deleted_at')
      .first()
    if (tag) this.error(400, '该标签已存在')
    const [id] = await knex('sofo_tags').insert(params)
    params.id = id
    return params
  }

  async show(params) {
    const result = await this.exists('sofo_tags', { id: params.id })
    return result
  }

  async update(params) {
    await this.exists('sofo_tags', { id: params.id })
    params.updated_at = new Date()
    const result = await knex('sofo_tags')
      .where('id', params.id)
      .update(params)
    return result
  }

  async destroy(params) {
    await this.exists('sofo_tags', { id: params.id })
    const result = await knex('sofo_tags')
      .where('id', params.id)
      .update({ deleted_at: new Date() })
    return result
  }
}
