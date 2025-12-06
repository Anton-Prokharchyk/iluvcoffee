import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UuidValidationPipe } from 'src/common/pipes/parse-int/uuid-validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    const { offset, limit } = paginationQuery;
    return this.coffeesService.findAll(offset, limit);
  }

  @Get(':id')
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body()
    body: CreateCoffeeDto,
  ) {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() body: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.coffeesService.remove(id);
  }
}
