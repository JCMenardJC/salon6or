import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Produit extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nom: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  urlImage: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  prix: number;
}
