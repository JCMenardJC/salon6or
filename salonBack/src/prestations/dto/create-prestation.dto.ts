import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePrestationDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  temps: string;

  @IsNotEmpty()
  @IsNumber()
  prix: number;
}
