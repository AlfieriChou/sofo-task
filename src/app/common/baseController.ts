import { plainToClass, ClassTransformOptions } from 'class-transformer'
import {
  TransformValidationOptions,
  transformAndValidate
} from 'class-transformer-validator'
import { ValidationErrorException } from './exception'

export class BaseController {
  public deserialize(
    model,
    params,
    options?: ClassTransformOptions | undefined
  ) {
    return plainToClass(model, params, options)
  }
  public async validate(model, body, option?: TransformValidationOptions) {
    try {
      await transformAndValidate(model, body, option)
    } catch (err) {
      throw new ValidationErrorException(JSON.stringify(err[0].constraints))
    }
  }
}
