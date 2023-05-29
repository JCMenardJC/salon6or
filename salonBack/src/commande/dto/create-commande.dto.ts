import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Produit } from 'src/produits/entities/produit.entity';
import { User } from 'src/users/entities/user.entity';

// Cette classe représente un objet de création de commande.

export class CreateCommandeDto {
  @ApiProperty()
  @IsNumber()
  prix_total: number;

  @ApiProperty()
  @IsBoolean()
  payee: boolean;

  @ApiProperty()
  @IsBoolean()
  livree: boolean;

  @ApiProperty({ type: [Produit] })
  @IsOptional()
  produits: Produit[];

  @ApiProperty({ type: User })
  @IsOptional()
  user: User;
}
