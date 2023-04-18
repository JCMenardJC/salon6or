import { Module } from '@nestjs/common';
import { CoordonneesService } from './coordonnees.service';
import { CoordonneesController } from './coordonnees.controller';

@Module({
  controllers: [CoordonneesController],
  providers: [CoordonneesService]
})
export class CoordonneesModule {}
