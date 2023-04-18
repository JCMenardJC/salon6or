import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
@Entity()
export class Prestation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nom: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  temps: string;

  @Column({ type: 'decimal' })
  prix: number;
}
