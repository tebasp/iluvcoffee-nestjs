import { IsNumber, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsNumber()
  readonly name: string;

  @IsString()
  readonly brand: string;

  // each: valida que sea un arreglo
  @IsString({ each: true })
  readonly flavors: string[];
}
