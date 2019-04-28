import { Length, ValidateIf, IsNumber, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { property, swaggerTypes, swaggerFormats } from '../decorator/router'

export class Register {
  @Length(3, 32)
  username!: string
  @Length(6, 32)
  password!: string
  @Transform(value => Number(value))
  @ValidateIf(o => o.otherProperty === 'value')
  age!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  description!: string
}

export class Login {
  @Length(3, 32)
  username!: string
  @Length(6, 32)
  password!: string
}

export class User {
  @property({
    type: swaggerTypes.number,
    description: 'id'
  })
  id!: number
  @property({
    type: swaggerTypes.string,
    description: 'user name'
  })
  username!: string
  @property({
    type: swaggerTypes.string,
    description: 'password'
  })
  password!: string
  @property({
    type: swaggerTypes.number,
    description: 'age'
  })
  age!: number
  @property({
    type: swaggerTypes.string,
    description: 'description'
  })
  description!: string
  @property({
    type: swaggerTypes.string,
    description: 'user type'
  })
  user_type!: string
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

export class Update {
  id: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsNumber()
  age!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  description!: string
}
