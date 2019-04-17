import { CreateTable } from '../type'
import { Operation } from '../enum'

export const createTag: CreateTable = {
  opt: Operation.create,
  table: 'sofo_tags',
  column: {
    id: { type: 'increments' },
    user_id: { type: 'integer', comment: '关联用户' },
    tag: { type: 'string', length: '16', comment: '标签' },
    description: { type: 'text', comment: '标签描述' },
    created_at: { type: 'timestamp', comment: '创建时间' },
    updated_at: { type: 'datetime', comment: '更新时间' },
    deleted_at: { type: 'datetime', comment: '删除时间' }
  }
}
