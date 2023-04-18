import { Test, TestingModule } from '@nestjs/testing';
import { CoordonneesService } from './coordonnees.service';

describe('CoordonneesService', () => {
  let service: CoordonneesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordonneesService],
    }).compile();

    service = module.get<CoordonneesService>(CoordonneesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
