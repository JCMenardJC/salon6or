import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrestationsModule } from './prestations/prestations.module';
import { UsersModule } from './users/users.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { ProduitsModule } from './produits/produits.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestation } from './prestations/entities/prestation.entity';
import { AdressesModule } from './adresses/adresses.module';
import { CoordonneesModule } from './coordonnees/coordonnees.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Prestation],
      synchronize: true,
    }),
    AuthModule,
    PrestationsModule,
    UsersModule,
    RendezVousModule,
    ProduitsModule,
    AdressesModule,
    CoordonneesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
