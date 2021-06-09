import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),
    MulterModule.register({
      dest: './files'
    })
  ],
  providers: [AppService, UserService, ConfigService],
  exports: [AppService, UserService, ConfigService]
})
export class ServicesModule { }
