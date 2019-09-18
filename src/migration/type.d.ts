import { Operation } from './enum';

export interface Migration {
  opt: Operation
  table?: string
  column?: Object
  field?: string
  content?: Object
  from_column?: string
  to_column?: string
  from_table?: string
  to_table?: string
  sql?: string
}

export interface CreateTable {
  opt: Operation.create
  table: string
  column: Object
}

export interface AddColumn {
  opt: Operation.addColumn
  table: string
  field: string
  content: Content
}

interface Content {
  type: string
  length?: number
  precision?: number
  scale?: string
  default?: any
  comment?: string
  after?: string
}

export interface DropColumn {
  opt: Operation.dropColumn
  table: string
  field: string
}

export interface RenameColumn {
  opt: Operation.renameColumn
  from_column: string
  to_column: string
}

export interface RenameTable {
  opt: Operation.renameTable
  from_table: string
  to_table: string
}

export interface Raw {
  opt: Operation.raw
  sql: string
}

export interface Drop {
  opt: Operation.drop
  table: string
}
