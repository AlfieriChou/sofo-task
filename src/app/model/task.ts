import { IsString, IsNumber } from 'class-validator'

export class Create {
  @IsNumber()
  user_id!: number
  @IsNumber()
  tag_id!: number
  @IsString()
  content!: string
  date!: Date
  start_at!: Date
  end_at!: Date
}
