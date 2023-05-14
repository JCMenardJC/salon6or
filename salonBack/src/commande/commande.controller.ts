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
import { Commande } from './entities/commande.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('commandes')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post()
  async create(
    @Body() createCommandeDto: CreateCommandeDto,
  ): Promise<Commande> {
    return await this.commandeService.create(createCommandeDto);
  }

  @Get()
  async findAll() {
    return await this.commandeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commandeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return await this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.commandeService.remove(+id);
  }
}
