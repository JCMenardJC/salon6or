import { Injectable } from '@nestjs/common';
import { CreateCoordonneeDto } from './dto/create-coordonnee.dto';
import { UpdateCoordonneeDto } from './dto/update-coordonnee.dto';

@Injectable()
export class CoordonneesService {
  create(createCoordonneeDto: CreateCoordonneeDto) {
    return 'This action adds a new coordonnee';
  }

  findAll() {
    return `This action returns all coordonnees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coordonnee`;
  }

  update(id: number, updateCoordonneeDto: UpdateCoordonneeDto) {
    return `This action updates a #${id} coordonnee`;
  }

  remove(id: number) {
    return `This action removes a #${id} coordonnee`;
  }
}
