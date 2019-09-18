import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { BaseService } from '../common/baseService';
import { knex } from '../../database';
import { User } from '../model/user';

interface Payload {
  sub: User
  exp: number
}

@Service()
export class UserService extends BaseService {
  private createToken(user: User): string {
    const created_at: Date = new Date();
    created_at.setDate(created_at.getDate() + 30);
    const timeStamp: number = Date.parse(created_at.toString());
    const payload: Payload = {
      sub: user,
      exp: timeStamp,
    };
    return jwt.sign(payload, 'sofo');
  }

  async register(params) {
    const exists = await knex('sofo_users')
      .where('username', params.username)
      .whereNull('deleted_at')
      .first();
    if (exists) this.error(400, '该用户名已存在！！');
    const password = await bcrypt.hash(params.password, 10);
    const [id] = await knex('sofo_users').insert({
      username: params.username,
      password,
      age: params.age || 0,
      description: params.description || '',
    });
    params.id = id;
    return params;
  }

  async login(params) {
    const user = await knex('sofo_users')
      .where('username', params.username)
      .whereNull('deleted_at')
      .first();
    if (!user) this.error(404, '该账号不存在！！！');
    if (bcrypt.compare(params.password, user.password)) {
      const token = this.createToken(user);
      return {
        user,
        token,
      };
    }
    this.error(401, '登录失败');
  }

  async show(params) {
    const result = await this.exists('sofo_users', { id: params.id });
    return result;
  }

  async update(params) {
    await this.exists('sofo_users', { id: params.id });
    params.updated_at = new Date();
    const result = await knex('sofo_users')
      .where('id', params.id)
      .update(params);
    return result;
  }

  async destroy(params) {
    await this.exists('sofo_users', { id: params.id });
    const result = await knex('sofo_users')
      .where('id', params.id)
      .update({ deleted_at: new Date() });
    return result;
  }
}
