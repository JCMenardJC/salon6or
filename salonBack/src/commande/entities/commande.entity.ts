import { Produit } from 'src/produits/entities/produit.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

// Cette classe représente l'entité "Commande" dans la base de données.

@Entity()
export class Commande extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  prix_total: number;

  @Column()
  payee: boolean;

  @Column()
  livree: boolean;

  @ManyToMany(() => Produit, (produit) => produit.commandes)
  @JoinTable()
  produits: Produit[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
