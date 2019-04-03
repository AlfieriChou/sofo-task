import { CreateTable } from '../type'
import { Operation } from '../enum'

export const createUser: CreateTable = {
  opt: Operation.create,
  table: 'sofo_users',
  column: {
    id: { type: 'increments' },
    username: { type: 'string', length: '32', comment: '用户名' },
    password: { type: 'string', length: '32', comment: '用户密码' },
    age: { type: 'float', precision: 3, scale: 0, comment: '年龄' },
    description: { type: 'text', comment: '用户描述' },
    user_type: { type: 'string', length: '32', comment: '用户类型' },
    created_at: { type: 'timestamp', comment: '创建时间' },
    updated_at: { type: 'datetime', comment: '更新时间' },
    deleted_at: { type: 'datetime', comment: '删除时间' }
  }
}
