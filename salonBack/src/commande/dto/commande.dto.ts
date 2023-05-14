import { ApiProperty } from '@nestjs/swagger';
import { ProduitDto } from 'src/produits/dto/produit.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class CommandeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  prix_total: number;

  @ApiProperty()
  payee: boolean;

  @ApiProperty()
  livree: boolean;

  @ApiProperty({ type: [ProduitDto] })
  produits: ProduitDto[];

  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
