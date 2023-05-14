import { Repository } from 'typeorm';
import { Commande } from '../commande/entities/commande.entity';

export class CommandeRepository extends Repository<Commande> {}
