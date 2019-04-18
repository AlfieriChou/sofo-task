import { IsString, IsDateString } from 'class-validator'
import { Transform } from 'class-transformer'

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
