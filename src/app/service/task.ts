import { Service } from 'typedi';
import { BaseService } from '../common/baseService';
import { knex } from '../../database';

@Service()
export class TaskService extends BaseService {
  async index(params) {
    const sql = knex('sofo_tasks')
      .leftJoin('sofo_tags', 'sofo_tasks.tag_id', 'sofo_tags.id')
      .whereNull('sofo_tasks.deleted_at')
      .select(
        'sofo_tasks.*',
        'sofo_tags.tag as tag',
        'sofo_tags.description as description',
      );
    if (params.id) sql.where('id', params.id);
    if (params.user_id) sql.where('user_id', params.user_id);
    if (params.tag_id) sql.where('tag_id', params.tag_id);
    if (params.sort) sql.orderBy(this.getSort(params.sort));
    if (params.pagination) {
      const countSql = sql.clone();
      const { count } = await countSql.count('* as count').first();
      sql.offset((params.page - 1) * params.size).limit(params.size);
      const result = await sql;
      const paginate = this.paginate(Number(count), params.page, params.size);
      return {
        result,
        paginate,
      };
    }
    const data = await sql;
    return data;
  }

  async create(params) {
    params.start_at = new Date(params.start_at);
    params.end_at = new Date(params.end_at);
    const [id] = await knex('sofo_tasks').insert(params);
    params.id = id;
    return params;
  }

  async show(params) {
    const result = await this.exists('sofo_tasks', { id: params.id });
    return result;
  }

  async update(params) {
    await this.exists('sofo_tasks', { id: params.id });
    params.updated_at = new Date();
    const result = await knex('sofo_tasks')
      .where('id', params.id)
      .update(params);
    return result;
  }

  async destroy(params) {
    await this.exists('sofo_tasks', { id: params.id });
    const result = await knex('sofo_tasks')
      .where('id', params.id)
      .update({
        deleted_at: new Date(),
      });
    return result;
  }
}
