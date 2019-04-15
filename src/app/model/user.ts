import { Length } from 'class-validator'

export class Register {
  @Length(3, 15)
  username: string
  @Length(6, 25)
  password: string
  age?: number
  description?: string
}

export class Login {
  @Length(3, 15)
  username: string
  @Length(6, 25)
  password: string
}
