import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';

/* nuesto auth.service.ts tendría que hacer todo el trabajo de crear usuarios, verificar el login, verificar el JWT (Json Web Token), etc., es decir, tener la lógica de negocio centralizada en este servicio y que nuestro controlador sea quien llame a estos métodos */
@Injectable()
export class AuthService {
  /* inyectar nuestro modelo para poder trabajar con la base de datos. Una vez inyectado nuestro modelo ya podemos hacer las interacciones con la base de datos en relación a todo lo que se tenga definido al esquema/schema creado */
  constructor(
    /* aquí es una propiedad simple que es el userModel que tiene un decorador @InjectModel. Se puede colocar un nombre en el decorador como @InjectModel(User.name, 'users') pero también se puede quitar y hacerlo más simple con User.name */
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  /* se podría colocar async create().... y luego en el return colocar return await ..... para que nos salga los errores de una forma más clara */
  async create(createUserDto: CreateUserDto): Promise<User> {
    /* cuando la data ya llega a este punto es que ya tengo todo lo necesario para crear un usuario */
    // console.log(createUserDto);
    // return 'This action adds a new auth';

    try {
      /* crear un nuevo usuario */
      const newUser = new this.userModel(createUserDto);

      /* grabar el nuevo usuario donde save() es una promesa por eso coloca que el método create() regresará Promise<User> */
      return await newUser.save();
    } catch (error) {
      // console.log(error);
      if (error.code === 11000) {
        /* aquí podemos manejar los errores ya que por ejemplo, el código 11000 es para una llave duplicada y aquí sería solo colocar los errores para hacer errores controlados y Nest ya nos da algunos errores por defecto */
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something happen!');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
