import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommandeDto } from './create-commande.dto';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

// Ce DTO (Data Transfer Object) représente les données de mise à jour d'une commande.
export class UpdateCommandeDto extends PartialType(CreateCommandeDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  prix_total: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  payee: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  livree: boolean;
}
