import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginateQuery) {
    // const { limit, offset } = paginateQuery;
    return this.coffeeService.findAll();
  }

  @Get(':id')
  // if Transform: true in globalPipes, the id param is converted to String
  findOne(@Param('id') id: string) {
    const coffee = this.coffeeService.findOne(id);
    if (!coffee) {
      // throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee ${id} not found`);
    }
    return coffee;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return `This is an update ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
