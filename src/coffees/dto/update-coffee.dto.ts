import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {
  // PartiType inherits: validators, fields with optional ?
  // not needed, we have partial type
  //   readonly name?: string;
  //   readonly brand?: string;
  //   readonly flavors?: string[];
}
