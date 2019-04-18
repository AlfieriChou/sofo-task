import { Length, IsNumber } from 'class-validator'

export class Create {
  @IsNumber()
  user_id!: number
  @Length(1, 16)
  tag!: string
  description?: string
}

export class Update {
  @IsNumber()
  id: number
  description?: string
}

export class Tag {
  id: number
  user_id: number
  tag: string
  description?: string
  created_at: Date
  updated_at?: Date
  deleted_at?: Date
}
