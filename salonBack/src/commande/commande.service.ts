import { Injectable, NotFoundException } from '@nestjs/common';
import { Commande } from './entities/commande.entity';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  // Ce service gère les opérations liées aux commandes.

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
    // Retourne toutes les commandes avec les relations "produits" et "user".
    const allCommandes = await Commande.find({
      relations: ['produits', 'user'],
    });
    return allCommandes;
  }

  async findOne(id: number) {
    // Retourne une commande spécifique en fonction de l'ID, avec les relations "produits" et "user".
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
    // Met à jour une commande spécifique en fonction de l'ID avec les données du DTO de mise à jour.
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
    // Supprime une commande spécifique en fonction de l'ID.
    const commande = await Commande.findOne({
      where: { id: id },
    });
    if (!commande) {
      throw new NotFoundException("La commande n'existe pas");
    }
    await Commande.delete(id);
  }
}
