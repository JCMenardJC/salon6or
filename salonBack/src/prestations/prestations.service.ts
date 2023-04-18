import { Injectable } from '@nestjs/common';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';
import { Prestation } from './entities/prestation.entity';

/**
 * Class permettant la gestion des requêtes SQL pour les "produits"
 * * **.create()** :ajoute de nouveaux "produits" à la BDD
 * * **.findAll()** : recupère touts les "produits" dans la BDD
 * * **.findByNom()** : recupère un "produit" par son nom
 * * **.findOneById()**:recupère un "produit" par son ID
 * * **.update()** : modifie les donnees d'un ou des "produits" avec son ID
 * * **.remove()** : supprime les donnees d'un "produits"
 */

@Injectable()
export class PrestationsService {
  async create(createPrestationDto: CreatePrestationDto) {
    const newPrestation = new Prestation();
    newPrestation.nom = createPrestationDto.nom;
    newPrestation.description = createPrestationDto.description;
    newPrestation.temps = createPrestationDto.temps;
    newPrestation.prix = createPrestationDto.prix;
    await newPrestation.save();
    return newPrestation;
  }

  async findAll() {
    const allPrestations = await Prestation.find();
    return allPrestations;
  }

  async findByNom(nom: string) {
    const findPrestation = await Prestation.findOneBy({
      nom: nom,
    });
    return findPrestation;
  }

  async findOneById(id: number) {
    const findPrestation = await Prestation.findOneBy({
      id: id,
    });
    return findPrestation;
  }

  async update(id: number, updatePrestationDto: UpdatePrestationDto) {
    const data = await Prestation.findOneBy({ id: id });

    await Prestation.update(data.id, updatePrestationDto);

    const dataUpdated = await Prestation.findOneBy({ id: id });
    if (dataUpdated) {
      return dataUpdated;
    }
    return undefined;
  }

  async remove(id: number) {
    const idPrestation = await Prestation.findOneBy({ id: id });
    if (!idPrestation) {
      return `Ce produit n'existe pas !Vérifier l'Id SVP`;
    }
    await Prestation.remove(idPrestation);
    return idPrestation;
  }
}
