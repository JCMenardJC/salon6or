import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProduitDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  urlImage: string;

  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  prix: number;
}
