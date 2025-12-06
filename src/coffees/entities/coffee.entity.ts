import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Index(['name', 'brand'])
@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Index()
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  brand: string;
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];
}
