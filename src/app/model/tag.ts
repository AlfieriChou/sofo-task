import { Length, ValidateIf, IsString, IsBooleanString } from 'class-validator'
import { Transform } from 'class-transformer'
import { property, swaggerTypes, swaggerFormats } from '../decorator/router'

export class Query {
  @ValidateIf(o => o.otherProperty === 'value')
  @Transform(value => Number(value))
  id!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @Transform(value => Number(value))
  user_id!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  tag!: string
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
  @Length(1, 16)
  tag!: string
  description!: string
}

export class Update {
  @Transform(value => Number(value))
  id: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  description!: string
}

export class Tag {
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
    type: swaggerTypes.string,
    description: 'tag'
  })
  tag!: string
  @property({
    type: swaggerTypes.string,
    description: 'tag description'
  })
  description!: string
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
