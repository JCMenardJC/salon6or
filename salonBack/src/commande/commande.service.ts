import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { Commande } from './entities/commande.entity';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Produit } from 'src/produits/entities/produit.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommandeService {
  async create(createCommandeDto: CreateCommandeDto) {
    const { produits, user, ...rest } = createCommandeDto;

    const commande = new Commande();
    commande.prix_total = rest.prix_total;
    commande.payee = rest.payee;
    commande.livree = rest.livree;

    commande.produits = produits;
    commande.user = user;
    await commande.save();
    return commande;
  }

  async findAll() {
    const allCommandes = await Commande.find({
      relations: ['produits', 'user'],
    });
    return allCommandes;
  }

  async findOne(id: number) {
    const commande = await Commande.findOne({
      where: { id },
      relations: ['produits', 'user'],
    });
    if (!commande) {
      throw new NotFoundException("La commande n'existe pas");
    }
    return commande;
  }

  async update(
    id: number,
    updateCommandeDto: UpdateCommandeDto,
  ): Promise<Commande> {
    const { produits, ...rest } = updateCommandeDto;

    const commande = await Commande.findOne({
      where: { id },
      relations: ['produits', 'user'],
    });
    if (!commande) {
      throw new NotFoundException("La commande n'existe pas");
    }

    commande.prix_total = rest.prix_total;
    commande.payee = rest.payee;
    commande.livree = rest.livree;

    commande.produits = produits;
    return await Commande.save(commande);
  }

  async remove(id: number): Promise<void> {
    const commande = await Commande.findOne({
      where: { id: id },
    });
    if (!commande) {
      throw new NotFoundException("La commande n'existe pas");
    }
    await Commande.delete(id);
  }
}
