import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto, hash: string) {
    const newUser = new User();
    newUser.prenom = createUserDto.prenom;
    newUser.nom = createUserDto.nom;
    newUser.email = createUserDto.email;
    newUser.password = hash;
    newUser.adresse = createUserDto.adresse;
    newUser.ville = createUserDto.ville;
    newUser.codepostal = createUserDto.codepostal;
    newUser.telephone = createUserDto.telephone;
    newUser.admin = createUserDto.admin;

    await newUser.save();

    return newUser;
  }

  async findAll() {
    const users = await User.find();
    return users;
  }

  async findOneByEmail(email: string) {
    const userMail = await User.findOneBy({
      email: email,
    });

    return userMail;
  }

  async findOneById(id: number) {
    const user = await User.findOneBy({
      id: id,
    });

    if (user) {
      return user;
    }

    return undefined;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dataInit = await User.findOneBy({ id });
    const newData = Object.fromEntries(
      Object.entries(updateUserDto).filter((data) => !data.includes('animal')),
    );
    console.log('log sans animal', newData);

    const newKeys = Object.keys(updateUserDto).filter(
      (data) => data !== 'animal',
    );
    let cpt = 0;

    while (cpt > newKeys.length) {
      cpt++;
    }
    const data = await User.update(id, newData);

    const newUser = await User.find({ where: { id: id } });

    return newUser[0];
  }

  async delete(id: number) {
    const deleteUser = await User.findOneBy({ id: id });
    User.remove(deleteUser);
    return deleteUser;
  }
}
