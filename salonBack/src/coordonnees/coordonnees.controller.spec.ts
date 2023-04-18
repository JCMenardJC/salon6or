import { Test, TestingModule } from '@nestjs/testing';
import { CoordonneesController } from './coordonnees.controller';
import { CoordonneesService } from './coordonnees.service';

describe('CoordonneesController', () => {
  let controller: CoordonneesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordonneesController],
      providers: [CoordonneesService],
    }).compile();

    controller = module.get<CoordonneesController>(CoordonneesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
