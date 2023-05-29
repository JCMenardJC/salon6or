import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';
import { User } from 'src/users/entities/user.entity';

// Ce contrôleur gère les routes liées à l'authentification.
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Route pour l'inscription d'un nouvel utilisateur
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // Route pour la connexion d'un utilisateur
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  login(
    @Body() loginDto: LoginDto,
    @GetUser()
    user: User,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}
