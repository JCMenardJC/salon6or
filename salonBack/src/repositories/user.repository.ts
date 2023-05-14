import { Repository } from 'typeorm';
import { Commande } from '../commande/entities/commande.entity';

export class UserRepository extends Repository<Commande> {}
