import { Test, TestingModule } from '@nestjs/testing';
import { MascotaService } from './mascota.service';

describe('MascotaService', () => {
  let service: MascotaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MascotaService],
    }).compile();

    service = module.get<MascotaService>(MascotaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
