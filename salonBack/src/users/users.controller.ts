import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Patch,
  Request,
  ConflictException,
  Get,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EStatus } from 'src/constants/enum';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AdminMiddleware } from 'src/auth/adminMiddleware';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;

    const isEmailExist = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (isEmailExist)
      throw new ConflictException(
        'E-mail déjà utilisé, veuillez entrer un e-mail valide',
      );

    const confirm = createUserDto.password === createUserDto.confirmPassword;
    if (!confirm)
      throw new ConflictException(
        `La confirmation du mot de passe n'est pas valide`,
      );

    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user = await this.usersService.create(createUserDto, hash);

    return {
      statusCode: 201,
      message: 'Utilisateur enregistré',
      data: {
        user,
      },
    };
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findAll() {
    const users = await this.usersService.findAll();
    if (!users) {
      throw new NotFoundException('Pas de compte enregistreé pour l instant');
    }
    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: LoginDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('profil')
  async getProfile(@Request() req) {
    const profil = await this.usersService.findOneByEmail(req.user.email);
    return profil;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const userLogged = req.user.userId;

    const userUpdate = await this.usersService.update(
      userLogged,
      updateUserDto,
    );
    //console.log('apres update', userUpdate);

    return {
      statusCode: 201,
      message: 'Modifications enregistrées',
      data: {
        userUpdate,
      },
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const userRemoved = await this.usersService.delete(+id);
    return {
      status: EStatus.OK,
      message: `Le compte numéro ${id} a été supprimé`,
      data: userRemoved,
    };
  }
}
