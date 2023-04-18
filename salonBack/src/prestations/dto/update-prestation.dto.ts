import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreatePrestationDto } from './create-prestation.dto';

export class UpdatePrestationDto extends PartialType(CreatePrestationDto) {
  @IsOptional()
  @IsString()
  nom: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  temps: string;

  @IsOptional()
  @IsNumber()
  prix: number;
}
