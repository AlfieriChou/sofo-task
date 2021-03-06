import { CreateTable } from '../type'
import { Operation } from '../enum'

export const createTask: CreateTable = {
  opt: Operation.create,
  table: 'sofo_tasks',
  column: {
    id: { type: 'increments' },
    user_id: { type: 'integer', comment: '关联用户' },
    tag_id: { type: 'integer', comment: '关联标签id' },
    content: { type: 'text', comment: '内容' },
    start_at: { type: 'datetime', comment: '开始时间' },
    end_at: { type: 'datetime', comment: '结束时间' },
    created_at: { type: 'timestamp', comment: '创建时间' },
    updated_at: { type: 'datetime', comment: '更新时间' },
    deleted_at: { type: 'datetime', comment: '删除时间' }
  }
}
