import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoordonneesService } from './coordonnees.service';
import { CreateCoordonneeDto } from './dto/create-coordonnee.dto';
import { UpdateCoordonneeDto } from './dto/update-coordonnee.dto';

@Controller('coordonnees')
export class CoordonneesController {
  constructor(private readonly coordonneesService: CoordonneesService) {}

  @Post()
  create(@Body() createCoordonneeDto: CreateCoordonneeDto) {
    return this.coordonneesService.create(createCoordonneeDto);
  }

  @Get()
  findAll() {
    return this.coordonneesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coordonneesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoordonneeDto: UpdateCoordonneeDto) {
    return this.coordonneesService.update(+id, updateCoordonneeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coordonneesService.remove(+id);
  }
}
