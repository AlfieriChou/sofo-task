import { Length, ValidateIf, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class Create {
  @Transform(value => Number(value))
  user_id!: number
  @Length(1, 16)
  tag!: string
  description?: string
}

export class Update {
  @Transform(value => Number(value))
  id: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  description!: string
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
