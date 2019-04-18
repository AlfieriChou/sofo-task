import { IsString, IsDateString, ValidateIf } from 'class-validator'
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

export class Update {
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  content?: string
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  start_at?: Date
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  end_at?: Date
}
