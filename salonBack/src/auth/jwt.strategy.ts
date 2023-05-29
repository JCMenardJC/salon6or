import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: 'jaimelessushis',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // Cette méthode est utilisée pour valider et décoder le token JWT
  // IMPORTANT IL FAUT GARDER CE NOM DE METHODE
  async validate(payload: any): Promise<User> {
    console.log('validate');
    const { email } = payload;
    const user: User = await this.userRepository.findOneBy({ email });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
