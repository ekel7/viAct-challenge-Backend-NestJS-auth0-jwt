import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import { AuthModule } from './controllers/auth/auth.module';
import { AppController } from './app.controller';
import { UserModule } from './controllers/user/user.module';
import { ServicesModule } from './services/services.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    AuthModule,
    UserModule,
    ServicesModule,
    MongooseModule.forRoot('mongodb://localhost/nest-tutorial1'),

  ],
  controllers: [AppController]
})
export class AppModule { }
