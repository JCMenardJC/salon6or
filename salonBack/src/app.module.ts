import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrestationsModule } from './prestations/prestations.module';
import { UsersModule } from './users/users.module';
import { RendezVousModule } from './rendez-vous/rendez-vous.module';
import { ProduitsModule } from './produits/produits.module';

@Module({
  imports: [AuthModule, PrestationsModule, UsersModule, RendezVousModule, ProduitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
