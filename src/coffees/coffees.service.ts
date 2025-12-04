import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: '1',
      name: 'Espresso',
      brand: 'BrandA',
      flavors: ['strong', 'bitter'],
    },
    { id: '2', name: 'Latte', brand: 'BrandB', flavors: ['milky', 'sweet'] },
  ];
  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    const coffee: Coffee | undefined = this.coffees.find(
      (coffee) => coffee.id === id,
    );
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Coffee {
    const existingCoffee = this.coffees.find(
      (c) => c.name === createCoffeeDto.name,
    );
    if (existingCoffee) {
      throw new ConflictException('Coffee already exists');
    }
    const newCoffee = { ...createCoffeeDto, id: Date.now().toString() };
    this.coffees.push(newCoffee);
    return newCoffee;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto): Coffee {
    const coffee: Coffee = this.findOne(id);
    if (!coffee) {
      throw new NotFoundException('Coffee not found');
    }
    const updatedCoffee: Coffee = { ...coffee, ...updateCoffeeDto };
    const index = this.coffees.findIndex((c) => c.id === id);
    this.coffees[index] = updatedCoffee;
    return updatedCoffee;
  }

  remove(id: string): Coffee {
    const coffee: Coffee = this.findOne(id);
    if (!coffee) {
      throw new NotFoundException('Coffee not found');
    }
    this.coffees = this.coffees.filter((c) => c.id !== id);
    return coffee;
  }
}
