import { Test, TestingModule } from '@nestjs/testing';
import { MascotaController } from './mascota.controller';
import { MascotaService } from './mascota.service';

describe('MascotaController', () => {
  let controller: MascotaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MascotaController],
      providers: [MascotaService],
    }).compile();

    controller = module.get<MascotaController>(MascotaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
