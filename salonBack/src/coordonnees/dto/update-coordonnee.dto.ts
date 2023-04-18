import { PartialType } from '@nestjs/mapped-types';
import { CreateCoordonneeDto } from './create-coordonnee.dto';

export class UpdateCoordonneeDto extends PartialType(CreateCoordonneeDto) {}
