import { User } from '../entities/user.entity';

export interface LoginResponse {
  /* darse cuenta que User viene de user.entity.ts y esta es una clase pero en TypeScript las clases también se pueden usar como si fueran un tipo de dato */
  user: User;
  token: string;
}
