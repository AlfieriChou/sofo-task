import { Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class Register {
  @Length(3, 32)
  username!: string
  @Length(6, 32)
  password!: string
  @Transform(value => Number(value))
  age?: number
  description?: string
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
  age?: number
  description?: string
}
