import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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
@Unique(['email', 'pseudo'])
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
  pseudo: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty()
  @Exclude()
  @Column({ type: 'varchar' })
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
  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  avatar: string;
}
