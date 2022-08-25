import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './conffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

// Just for testing Factory Provider
@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['nescafe', 'cubanito'];
  }
}

// forFeature: es para importar entities (Models)
// ConfigModule: se puede importar solo, traer la config root
// ConfigModule.forFeature: trae la config del modulo

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor]),
    ConfigModule.forFeature(coffeesConfig),
  ], // Solo se importa modulos
  exports: [CoffeesService],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory, // Need to be in the module to factory runs
    { provide: COFFEE_BRANDS, useValue: ['nescafe'] }, // Pase constants, enums, etc.
    {
      // Async in factory is Optional
      provide: COFFEE_BRANDS,
      useFactory: async (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
      scope: Scope.TRANSIENT, // Use default for Performance
    },
  ],
})
export class CoffeesModule {
  constructor() {
    console.log('Test env vars ', process.env.DATABASE_PORT);
  }
}

// Custom providers
// UseValue - UseClass - UseFactory

//                        File Name                  Class Name
// providers: [{ provide: CoffeesService, useClass: CoffeesService }];

// Mock a class for testing
/*
useValue: pass anything as value

  class MockCoffeeService {}
  providers: [{ provide: CoffeesService, useValue: new MockCoffeeService() }];
*/
