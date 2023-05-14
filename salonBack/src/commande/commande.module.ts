import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandeRepository } from 'src/repositories/command.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { ProduitRepository } from 'src/repositories/produit.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommandeRepository,
      UserRepository,
      ProduitRepository,
    ]),
  ],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
