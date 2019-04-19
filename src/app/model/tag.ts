import { Length, ValidateIf, IsString, IsBooleanString } from 'class-validator'
import { Transform } from 'class-transformer'

export class Query {
  @ValidateIf(o => o.otherProperty === 'value')
  @Transform(value => Number(value))
  id!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @Transform(value => Number(value))
  user_id!: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  tag!: string
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
  @Length(1, 16)
  tag!: string
  description!: string
}

export class Update {
  @Transform(value => Number(value))
  id: number
  @ValidateIf(o => o.otherProperty === 'value')
  @IsString()
  description!: string
}
