import * as bcrypt from 'bcrypt';
import {
  ClassSerializerInterceptor,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // création d'une entité user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    try {
      // enregistrement de l'entité user
      const createdUser = await this.userRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const users = await this.userRepository.findOneBy({ email });

    if (users && (await bcrypt.compare(password, users.password))) {
      const payload = { email: users.email, sub: users.id };
      const accessToken = await this.jwtService.sign(payload);
      console.log(users);
      return { accessToken, ...users };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants sont incorectes,veuillez verifier vos données',
      );
    }
  }
}
