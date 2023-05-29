import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitDto } from './create-produit.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  nom: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  urlImage: string;

  @ApiProperty() /* 
  @IsDecimal() */
  @IsOptional()
  prix: number;
}
