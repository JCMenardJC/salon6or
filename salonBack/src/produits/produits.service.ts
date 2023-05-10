import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitsService {
  async create(createProduitDto: CreateProduitDto) {
    const newProduit = new Produit();
    newProduit.nom = createProduitDto.nom;
    newProduit.description = createProduitDto.description;
    newProduit.urlImage = createProduitDto.urlImage;
    newProduit.prix = createProduitDto.prix;
    await newProduit.save();
    return newProduit;
  }

  async findAll() {
    const allProduits = await Produit.find();
    return allProduits;
  }

  async findByNom(nom: string) {
    const findProduit = await Produit.findOneBy({
      nom: nom,
    });
    return findProduit;
  }

  async findOneById(id: number) {
    const findProduit = await Produit.findOneBy({
      id: id,
    });
    return findProduit;
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    const data = await Produit.findOneBy({ id: id });

    await Produit.update(data.id, updateProduitDto);

    const dataUpdated = await Produit.findOneBy({ id: id });
    if (dataUpdated) {
      return dataUpdated;
    }
    return undefined;
  }

  async remove(id: number) {
    const idProduit = await Produit.findOneBy({ id: id });
    if (!idProduit) {
      return `Ce produit n'existe pas !Vérifier l'Id SVP`;
    }
    await Produit.remove(idProduit);
    return idProduit;
  }
}
