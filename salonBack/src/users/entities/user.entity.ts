import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Commande } from 'src/commande/entities/commande.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  prenom: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  nom: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  telephone: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  adresse: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  ville: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  codepostal: string;

  @ApiProperty()
  @Column({ default: false })
  admin: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @OneToMany(() => Commande, (commande) => commande.user)
  commande: Commande[];
}
