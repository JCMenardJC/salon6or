import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PrestationsService } from './prestations.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';

@Controller('prestations')
export class PrestationsController {
  constructor(private readonly prestationsService: PrestationsService) {}

  @Post()
  async create(
    @Body() CreatePrestationDto: CreatePrestationDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const verifPrestation = await this.prestationsService.findByNom(
      CreatePrestationDto.nom,
    );
    console.log(verifPrestation);

    if (verifPrestation) {
      res.status(401).json({
        status: '401',
        message: 'Cette prestation existe déja!!',
      });
    } else {
      await this.prestationsService.create(CreatePrestationDto);
      res.status(201).json({
        status: '201',
        message: 'Success',
        data: CreatePrestationDto,
      });
    }
  }

  @Get()
  findAll() {
    return this.prestationsService.findAll();
  }

  @Post('nom')
  async findOneByNom(@Body('nom') nom: string) {
    const verifProd = await this.prestationsService.findByNom(nom);
    if (!verifProd) {
      return {
        status: 'Erreur',
        message: `Cette prestation n'existe pas !! Veuillez vérifier l'orthographe s'il vous plait.`,
      };
    }
    return this.prestationsService.findByNom(nom);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestationsService.findOneById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdatePrestationDto: UpdatePrestationDto,
  ) {
    const dataCheck = await this.prestationsService.findOneById(+id);
    if (!dataCheck) {
      return {
        status: 'Erreur',
        message: `Cet Id de prestation n'existe pas !! Veuillez verifier l'Id s'il vous plait.`,
      };
    }
    const dataUpdate = await this.prestationsService.update(
      +id,
      UpdatePrestationDto,
    );
    return {
      status: 'OK',
      message: `La prestation choisie a bien été modifiée !!`,
      dataUpdated: dataUpdate,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dataCheck = await this.prestationsService.findOneById(+id);
    if (!dataCheck) {
      return {
        status: 'Erreur',
        message: `Cette prestation n'existe pas !! Veuillez verifier l'Id s'il vous plait.`,
      };
    }
    const dataRemove = await this.prestationsService.remove(+id);
    return {
      status: 'Ok',
      message: 'La prestation a bien été supprimée de votre liste !!',
      dataRemoved: dataRemove,
    };
  }
}
