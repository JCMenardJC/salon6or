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
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post()
  async create(
    @Body() createProduitDto: CreateProduitDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const verifProduits = await this.produitsService.findByNom(
      createProduitDto.nom,
    );
    console.log(verifProduits);

    if (verifProduits) {
      res.status(401).json({
        status: '401',
        message: 'Ce produits existe déja!!',
      });
    } else {
      this.produitsService.create(createProduitDto);
      res.status(201).json({
        status: '201',
        message: 'Le Produit est ajouté avec succès',
        data: CreateProduitDto,
      });
    }
  }

  @Get()
  findAll() {
    return this.produitsService.findAll();
  }

  @Post('nom')
  async findOneByNom(@Body('nom') nom: string) {
    const verifProd = await this.produitsService.findByNom(nom);
    if (!verifProd) {
      return {
        status: 'Erreur',
        message: `Ce produit n'existe pas !! Veuillez vérifier l'orthographe s'il vous plait.`,
      };
    }
    return this.produitsService.findByNom(nom);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitsService.findOneById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    const dataCheck = await this.produitsService.findOneById(+id);
    if (!dataCheck) {
      return {
        status: 'Erreur',
        message: `Cet Id de produits n'existe pas !! Veuillez verifier l'Id s'il vous plait.`,
      };
    }
    const dataUpdate = await this.produitsService.update(+id, updateProduitDto);
    return {
      status: 'OK',
      message: `Le produits choisi a bien été modifiée !!`,
      dataUpdated: dataUpdate,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dataCheck = await this.produitsService.findOneById(+id);
    if (!dataCheck) {
      return {
        status: 'Erreur',
        message: `Ce produits n'existe pas !! Veuillez verifier l'Id s'il vous plait.`,
      };
    }
    const dataRemove = await this.produitsService.remove(+id);
    return {
      status: 'Ok',
      message: 'Le produits a bien été supprimé de votre liste !!',
      dataRemoved: dataRemove,
    };
  }
}
