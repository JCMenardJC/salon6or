import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommandeDto } from '../../commande/dto/commande.dto';

export class ProduitDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  urlImage: string;

  @ApiProperty()
  @IsDecimal()
  prix: number;

  @ApiProperty({ type: [CommandeDto] })
  @IsOptional()
  commandes: CommandeDto[];
}
