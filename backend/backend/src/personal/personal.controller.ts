import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PersonalService } from './personal.service';
import * as client from '@prisma/client';

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Get()
  findAll(): Promise<client.personal[]> {
    return this.personalService.findAll();
  }

  @Post()
  create(@Body() data: client.personal): Promise<client.personal> {
    return this.personalService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: client.personal,
  ): Promise<client.personal> {
    return this.personalService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<client.personal> {
    return this.personalService.delete(Number(id));
  }
}
