import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MascotaService } from './mascota.service';
import * as client from '@prisma/client';

@Controller('mascotas')
export class MascotaController {
  constructor(private readonly mascotaService: MascotaService) {}

  @Get()
  findAll(): Promise<client.mascota[]> {
    return this.mascotaService.findAll();
  }

  @Post()
  create(@Body() data: client.mascota): Promise<client.mascota> {
    return this.mascotaService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: client.mascota,
  ): Promise<client.mascota> {
    return this.mascotaService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<client.mascota> {
    return this.mascotaService.delete(Number(id));
  }
}
