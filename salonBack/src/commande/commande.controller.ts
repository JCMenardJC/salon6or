import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

// Ce contrôleur gère les routes liées aux commandes
@Controller('commandes')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  // Endpoint pour créer une commande
  @Post()
  async create(@Body() createCommandeDto: CreateCommandeDto) {
    return await this.commandeService.create(createCommandeDto);
  }

  // Endpoint pour récupérer toutes les commandes
  @Get()
  async findAll() {
    return await this.commandeService.findAll();
  }

  // Endpoint pour récupérer une commande spécifique en fonction de son ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commandeService.findOne(+id);
  }

  // Endpoint pour mettre à jour une commande spécifique en fonction de son ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return await this.commandeService.update(+id, updateCommandeDto);
  }

  // Endpoint pour supprimer une commande spécifique en fonction de son ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.commandeService.remove(+id);
  }
}
