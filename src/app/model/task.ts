import {
  IsString,
  IsDateString,
  ValidateIf,
  IsBooleanString
} from 'class-validator'
import { Transform } from 'class-transformer'

export class Query {
  @ValidateIf(o => o.otherProperty === 'value')
  @Transform(value => Number(value))
  id!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  tag!: string
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  start_at_start!: Date
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  start_at_end!: Date
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
  content!: string
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  start_at!: Date
  @ValidateIf(o => o.otherProperty === 'value')
  @IsDateString()
  end_at!: Date
}
