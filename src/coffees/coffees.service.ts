import {
  HttpException,
  HttpStatus,
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
      throw new HttpException('Coffee already exists', HttpStatus.CONFLICT);
    }
    const newCoffee = { ...createCoffeeDto, id: Date.now().toString() };
    this.coffees.push(newCoffee);
    return newCoffee;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto): Coffee {
    const coffee: Coffee = this.findOne(id);
    if (!coffee) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }
    let updatedCoffee: Coffee;
    if (!updateCoffeeDto.flavors) {
      updatedCoffee = { ...coffee, ...updateCoffeeDto };
    } else {
      updatedCoffee = {
        ...coffee,
        ...updateCoffeeDto,
        flavors: [...updateCoffeeDto.flavors, ...coffee.flavors],
      };
    }
    const index = this.coffees.findIndex((c) => c.id === id);
    this.coffees[index] = updatedCoffee;
    return updatedCoffee;
  }

  remove(id: string): Coffee {
    const coffee: Coffee = this.findOne(id);
    if (!coffee) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }
    this.coffees = this.coffees.filter((c) => c.id !== id);
    return coffee;
  }
}
