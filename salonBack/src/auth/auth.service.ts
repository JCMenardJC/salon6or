import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';

// Ce service gère l'authentification des utilisateurs.
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  // Méthode pour s'inscrire en tant qu'utilisateur
  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création d'une entité user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    try {
      // Enregistrement de l'entité user
      const createdUser = await this.userRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      // Gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Méthode pour se connecter en tant qu'utilisateur
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      const accessToken = await this.jwtService.sign(payload);
      console.log(user);
      return { accessToken, ...user };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants sont incorrects, veuillez vérifier vos données',
      );
    }
  }
}
