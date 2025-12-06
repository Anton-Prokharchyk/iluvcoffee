import { DataSource, DataSourceOptions } from 'typeorm';

const postgresConfigOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 54321,
  username: 'postgres',
  password: 'postgres',
  database: 'iluvcoffee',
  synchronize: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
};

export default new DataSource(postgresConfigOptions);

export const TypeOrmModuleOptions = {
  ...postgresConfigOptions,
  autoLoadEntities: true,
};
