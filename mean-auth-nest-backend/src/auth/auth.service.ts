import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { RegisterUserDto } from './dto/register-user.dto';

/* nuesto auth.service.ts tendría que hacer todo el trabajo de crear usuarios, verificar el login, verificar el JWT (Json Web Token), etc., es decir, tener la lógica de negocio centralizada en este servicio y que nuestro controlador sea quien llame a estos métodos */
@Injectable()
export class AuthService {
  /* inyectar nuestro modelo para poder trabajar con la base de datos. Una vez inyectado nuestro modelo ya podemos hacer las interacciones con la base de datos en relación a todo lo que se tenga definido al esquema/schema creado */
  constructor(
    /* aquí es una propiedad simple que es el userModel que tiene un decorador @InjectModel. Se puede colocar un nombre en el decorador como @InjectModel(User.name, 'users') pero también se puede quitar y hacerlo más simple con User.name */
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /* se podría colocar async create().... y luego en el return colocar return await ..... para que nos salga los errores de una forma más clara y también es importante colocar el await para que, en pocas palabras, el error pueda suceder dentro de este servicio de create() y que no suceda fuera de create() ya que ahí se tendrían que hacer otras configuraciones para manejar el error */
  async create(createUserDto: CreateUserDto): Promise<User> {
    /* cuando la data ya llega a este punto es que ya tengo todo lo necesario para crear un usuario */
    // console.log(createUserDto);
    // return 'This action adds a new auth';

    try {
      /* hacer la desestructuración para obtener la contraseña para encriptarla y los demás datos están en ...userData */
      const { password, ...userData } = createUserDto;

      /* crear un nuevo usuario encriptando la contraseña usando un hash de una sola vía para hacer imposible la reconstrucción del valor que se tiene al encriptar al valor plano de la contraseña como tal */
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData,
      });

      /* grabar el nuevo usuario donde save() es una promesa por eso se coloca que el método create() regresará Promise<User>. Aquí es importante no mandarle datos de más al usuario en el objeto que se le envíe de nuevo en la respuesta del backend, por ejemplo, no mandarle la contraseña aunque de igual forma no se va a poder desencriptar pero sería bueno mandarle solo los datos necesarios en el objeto que se le mande al usuario en la respuesta del backend */
      // return await newUser.save(); // se está grabando y retornando todo el newUser
      await newUser.save(); // se está grabando todo el newUser pero abajo se retornará todo menos el password

      /* aquí se está nombrando a password como _ ya que arriba también se tiene una constante llamada password y puede ser que choque con esa constante y por eso se re-nombra aquí. NOTA: se utiliza el toJSON() ya que un objeto puede proporcionar el método toJSON para convertirlo a JSON, es decir, es un método que permite personalizar la representación JSON de un objeto definiendo cómo debería ser convertido a JSON. Cuando toJSON está presente en un objeto, JSON.stringify lo utilizará para crear la cadena JSON. Además de esta manera se rompe la referencia en el newUser en caso de que algo más se fuera a ejecutar en nuestro controlador */
      const { password: _, ...user } = newUser.toJSON();

      /* aquí como solo se está retornando user entonces en la entidad de user.entity.ts hay que colocar a password como opcional para que pueda o no venir esta propiedad que en este caso no vendrá. Otra forma también se puede eliminar el password en la entidad de user.entity.ts para que nunca vaya pero de la forma en la que lo hicimos ahora es una forma relativamente fácil de hacerlo */
      return user;
    } catch (error) {
      // console.log(error);
      if (error.code === 11000) {
        /* aquí podemos manejar los errores ya que por ejemplo, el código 11000 es para una llave duplicada y aquí sería solo colocar los errores para hacer errores controlados y Nest ya nos da algunos errores por defecto */
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something happen!');
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {
    /* darse cuenta que el método create() acepta normal al registerUserDto porque al final de cuentas, en este caso, registerUserDto es igual a createUserDto y entonces registerUserDto tiene todo lo necesario para que create() lo pueda aceptar */
    /* FORMA 1: registerUserDto cumple todo lo necesario para ser igual a createUserDto */
    const userToRegister = await this.create(registerUserDto);
    // console.log({ userToRegister });

    /* en caso no lo acepte entonces hay que hacer un poco de refactorización en este código, por ejemplo, extraer solos las propiedades que se necesiten */
    /* FORMA 2: registerUserDto NO cumple todo lo necesario para ser igual a createUserDto y hay que mandar solo lo que se necesita */
    // const user = await this.create({
    //   email: registerUserDto.email,
    //   name: registerUserDto.name,
    //   password: registerUserDto.password,
    // });

    /* aquí nos aparecerá un problema al querer usar el .id o el ._id ya que no aparece la propiedad pero nosotros sabemos que userToRegister es de tipo User y ese es un usuario que se crea en la base de datos entonces sí o sí vendrá el _id porque mongo lo crea por nosotros. Entonces para hacer una solución rápida en user.entity.ts crearemos la propiedad de _id?: string pero será como opcional porque al final de cuentas MongoDB creará ese _id por nosotros */
    return {
      user: userToRegister,
      token: this.getJsonWebToken({ id: userToRegister._id }),
    };
  }

  /* este login debería retornar el usuario y el token de acceso que será un JWT */
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    // console.log(loginDto);

    /* encontrar el usuario según el correo electrónico */
    const user = await this.userModel.findOne({ email: loginDto.email });
    // console.log(user);

    /* validar si existe el usuario según el email */
    if (!user) {
      throw new UnauthorizedException('Not valid credentials - email');
    }

    /* validar si existe la contraseña que se le está mandando desde el frontend vs la contraseña de la base de datos (la contraseña de la base de datos está encriptada) */
    if (!bcryptjs.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException('Not valid credentials - password');
    }

    const { password: _, ...userData } = user.toJSON();

    /* FORMA 1: para tener de forma directa las propiedades del userData */
    // return {
    //   ...userData,
    //   token: 'ABC-123',
    // };

    /* FORMA 2: para tener agrupada las propiedades de userData en una propiedad user */
    return {
      user: userData,
      token: this.getJsonWebToken({ id: user.id }), // si se coloca user._id entonces es el id que viene de MongoDB que tiene Types.ObjectId y entonces mejor lo colocamos como user.id
    };
    // return 'All Success!!';
  }

  /* regresará todos los usuarios */
  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(userId: string) {
    /* este user tendrá toda la información del usuario, contraseña, datos, etc que puede ser que algunas cosas no nos interesen entonces se hará la desestructuración para tener solo lo que necesito */
    const user = await this.userModel.findById(userId);
    const { password: _, ...userInfo } = user.toJSON(); // el toJSON() para asegurarnos que no mande funciones que vienen dentro de ese modelo de userModel

    return userInfo;
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

  /* aquí el payload que se está recibiendo será la información que yo quiero grabar en mi JWT para poder reconstruir a mi usuario y para eso crearemos una interface */
  getJsonWebToken(payload: JwtPayload) {
    /* tomar el payload anterior y utilizarlo para hacer la firma del token */
    const token = this.jwtService.sign(payload);
    return token;
  }
}
