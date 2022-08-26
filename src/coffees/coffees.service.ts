import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { COFFEE_BRANDS } from './conffees.constants';
import coffeesConfig from './config/coffees.config';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

/*
Scope: Todos los providers esta disponibles para todo la App,

Scope.default => es singleton => un solo provider para todas las requests => performance
Scope.Transient => dedicated provider => not shared across consumers
Scope.Request => instance a provider for each request
*/
@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {
  // InjectRepository: Crea el repository a partir del entity (Model)
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[], // TO inject constant or enums
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>, // private readonly configService: ConfigService, // Para Services no se usa inject, mejor inyectar el config del modulo
  ) {
    console.log('Brands values passsed ', coffeeBrands);

    console.log('Test namespaced env vars ', coffeesConfiguration.PORT);

    // it is Better to inject the Module Scoped Config
    // const databaseHost = this.configService.get<string>(
    //   'DATABASE_HOST',
    //   'localhost',
    // );
    // console.log('Test env files in service scope ', databaseHost);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    console.log(`limit: ${limit} offset: ${offset}`);

    // Find: No es necesario throw
    // relations: Para traer la data si se relaciona con otra tabla, con el nombre del campo
    return this.coffeeRepository.find({
      // relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id: +id,
      },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee id: ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    // Primero se crea en memoria y luego se guarda
    const coffee = await this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // Preload: hace un request para ver si existe y trae toda su data
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    // FindOne: No es necesario throw
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id: +id,
      },
    });
    return this.coffeeRepository.remove(coffee);
  }
}
