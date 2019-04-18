import { Length, ValidateIf, IsNumber, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

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
  id?: number
  username?: string
  password?: string
  age?: number
  description?: string
  user_type?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
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
