import { Test, TestingModule } from '@nestjs/testing';
import { ObjectLiteral, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';

type MockRepository<T extends ObjectLiteral> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <
  T extends ObjectLiteral,
>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository<Coffee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository<Flavor>(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository<Coffee>(),
        },
      ],
    }).compile();

    coffeeRepository = module.get<MockRepository<Coffee>>(
      getRepositoryToken(Coffee),
    );
    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeInstanceOf(CoffeesService);
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = { id: coffeeId, name: 'Test Coffee' };

        coffeeRepository.findOne?.mockReturnValue(expectedCoffee);
        const returnedCoffee = await service.findOne(coffeeId);
        expect(returnedCoffee).toEqual(expectedCoffee);
      });
    });
    describe('when coffee with ID does not exist', () => {
      it('should return not found exception', async () => {
        const coffeeId = '1';

        coffeeRepository.findOne?.mockReturnValue(undefined);
        try {
          await service.findOne(coffeeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          if (err instanceof NotFoundException)
            expect(err.message).toEqual(`Coffee with ID ${coffeeId} not found`);
        }
      });
    });
  });
});
