import { CreateTable } from '../type'
import { Operation } from '../enum'

export const createTask: CreateTable = {
  opt: Operation.create,
  table: 'sofo_tasks',
  column: {
    id: { type: 'increments' },
    user_id: { type: 'integer', comment: '关联用户' },
    tags: { type: 'string', length: '32', comment: '标签' },
    content: { type: 'text', comment: '内容' },
    date: { type: 'date', comment: '日期' },
    start_at: { type: 'datetime', comment: '开始时间' },
    end_at: { type: 'datetime', comment: '结束时间' },
    created_at: { type: 'timestamp', comment: '创建时间' },
    updated_at: { type: 'datetime', comment: '更新时间' },
    deleted_at: { type: 'datetime', comment: '删除时间' }
  }
}
