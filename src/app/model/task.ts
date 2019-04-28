import {
  IsString,
  IsDateString,
  ValidateIf,
  IsBooleanString
} from 'class-validator'
import { Transform } from 'class-transformer'
import { property, swaggerTypes, swaggerFormats } from '../decorator/router'

export class Query {
  @ValidateIf(o => o.otherProperty === 'value')
  @Transform(value => Number(value))
  id!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  tag!: string
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  start_at_start!: Date
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  start_at_end!: Date
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  sort!: string
  @ValidateIf(o => o.otherProperty === 'value')
  @IsBooleanString()
  pagination!: boolean
  @ValidateIf(o => o.otherProperty === 'value')
  @Transform(value => Number(value))
  page!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @Transform(value => Number(value))
  size!: number
}

export class Create {
  @Transform(value => Number(value))
  user_id!: number
  @Transform(value => Number(value))
  tag_id!: number
  @IsString()
  content!: string
  @IsDateString()
  start_at!: Date
  @IsDateString()
  end_at!: Date
}

export class Update {
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  content!: string
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  start_at!: Date
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  end_at!: Date
}

export class Task {
  @property({
    type: swaggerTypes.number,
    description: 'id'
  })
  id!: number
  @property({
    type: swaggerTypes.number,
    description: 'user id'
  })
  user_id!: number
  @property({
    type: swaggerTypes.number,
    description: 'tag id'
  })
  tag_id!: number
  @property({
    type: swaggerTypes.string,
    description: 'task contents'
  })
  content!: string
  @property({
    type: swaggerTypes.string,
    format: swaggerFormats.datetime,
    description: '开始时间'
  })
  start_at!: Date
  @property({
    type: swaggerTypes.string,
    format: swaggerFormats.datetime,
    description: '结束时间'
  })
  end_at!: Date
  @property({
    type: swaggerTypes.string,
    format: swaggerFormats.datetime,
    description: '创建时间'
  })
  created_at!: Date
  @property({
    type: swaggerTypes.string,
    format: swaggerFormats.datetime,
    description: '更新时间'
  })
  updated_at!: Date
  @property({
    type: swaggerTypes.string,
    format: swaggerFormats.datetime,
    description: '删除时间'
  })
  deleted_at!: Date
}
