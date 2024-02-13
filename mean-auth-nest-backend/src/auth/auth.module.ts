import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    /* en este módulo como también se están usando variables de entorno, aunque técnicamente ya están configuradas porque ya se hizo previamente pero como este es otro módulo que no se crea desde el principio entonces todavía no están puestas las variables de entorno, entonces por eso se vuelve a colocar ConfigModule.forRoot(), */
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ],
})
export class AuthModule {}
