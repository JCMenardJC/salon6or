import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { User } from './users/entities/user.entity';
import { AdminMiddleware } from './auth/adminMiddleware';
import { Produit } from './produits/entities/produit.entity';
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
      entities: [Prestation, User, Produit],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    PrestationsModule,
    UsersModule,
    RendezVousModule,
    ProduitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule /* implements NestModule */ {
  /* 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
  } */
}
