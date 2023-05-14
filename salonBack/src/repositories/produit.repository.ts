import { In, Repository } from 'typeorm';
import { Produit } from 'src/produits/entities/produit.entity';

export class ProduitRepository extends Repository<Produit> {}
