import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from 'supertest/types';
import * as request from 'supertest';

import { CoffeesModule } from 'src/coffees/coffees.module';

describe('Coffees - /coffees', () => {
  const testCoffee = {
    name: 'Test Coffee',
    brand: 'Test Brand',
    flavors: ['chocolate', 'vanilla'],
  };

  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 54322,
          username: 'postgres',
          password: 'postgres',
          database: 'iluvcoffee',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
  });

  it.todo('create coffee [POST] /coffees');
  it.todo('get all coffees [GET] /coffees');
  it.todo('get coffee by id [GET] /coffees/:id');
  it.todo('update coffee by id [PATCH] /coffees/:id');
  it.todo('delete coffee by id [DELETE] /coffees/:id');

  it('create coffee [POST] /coffees', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(testCoffee)
      .expect(HttpStatus.CREATED);
  });

  afterAll(async () => {
    await app.close();
  });
});
