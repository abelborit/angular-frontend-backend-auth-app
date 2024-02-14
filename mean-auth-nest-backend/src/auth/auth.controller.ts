import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { User } from './entities/user.entity';

/* los controladores que son los responsables de escuchar las peticiones que tenemos como GET, POST, PUT, PATCH, DELETE y emitir una respuesta */
/* la url a utilizar aquí sería localhost:3000/auth */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* aquí está la petición Post y lo que venga en el Body de la petición se encargará automáticamente de transformarlo para que luzca como se haya configurado el CreateUserDto */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    /* con este console.log(createUserDto); veremos lo que le estamos mandando en Postman mediante la petición Post una vez que se hace click en Send que en este caso se vería en la terminal { nombre: 'Nombre', propiedad2: 'Propiedad' } y con esto vemos que es sumamente poderoso y no tuvimos que hacer mayor configuración porque ya venía todo configurado por Nest para nosotros poder recibir ese objeto facilmente */
    console.log(createUserDto);
    // console.log(createUserDto.name); // usando la configuración en CreateUserDto ya se puede acceder a sus propiedades

    /* una vez configurado CreateUserDto pero sin validaciones entonces sería lo mismo que nada porque si mediante la petición Post yo le mando 2 propiedades pero según mi configuración de CreateUserDto tengo que recibir 3 propiedades entonces aquí y en el servicio auth.service.ts o donde se esté usando CreateUserDto se seguirían mostrando las 2 propiedades que le mandé por la petición entonces es importante hacer las validaciones correspondientes como el pipe que se añadió en el main.ts para que si se manda algo mediante la petición Post que no está dentro de CreateUserDto nos de un error como por ejemplo ``{"message": ["property nombre should not exist", "property propiedad2 should not exist"], "error": "Bad Request", "statusCode": 400}`` y el error según Postman es un 400 Bad Request y también hacer las validaciones correspondientes en create-user.dto.ts y con eso nos darán más errores ``{"message": ["property nombre should not exist", "property propiedad2 should not exist", "email must be an email", "name must be a string", "password must be longer than or equal to 6 characters"], "error": "Bad Request", "statusCode": 400}`` Y si no se manda nada entonces el backend no hace nada, ni si quiera imprime en consola algo */
    /* cuando se mande de forma correcta como por ejemplo { name: 'Nombre', email: 'correo@correo.com', password: '123456' } entonces el backend nos dará como respuesta lo que haya en el servicio en el método create que es en este caso ``This action adds a new auth`` */

    return this.authService.create(createUserDto);
  }

  /* así como para crear un usuario se creó un DTO llamado CreateUserDto entonces para este login también se debe crear un DTO para saber cómo es la data que se espera recibir. La URL será localhost:3000/auth/login y por eso se coloca '/login' ya que en el controlador está el 'auth' -> @Controller('auth') */
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    // console.log(loginDto);
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    // console.log(registerUserDto);
    return this.authService.register(registerUserDto);
  }

  /* usar el decorador @UseGuards(nombre del guard o de los guards). Para obtener el id del usuario cuando pase por el AuthGuard se puede hacer de varias formas como por ejemplo, crear decoradores personalizados pero eso significa tener un poco más de conocimiento en Nest y para evitar eso entonces lo haremos de la forma tradicional usando el decorador @Request() luego se obtendrá la request de tipo Request, es decir @Request() request: Request */
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() request: Request) {
    /* aquí tenemos la request por el lado del controlador y por algún lado de la request veremos que dice user: 'id del usuario' porque en el auth.guard.ts primero colocamos request['user'] = payload.id; que quiere decir que la request en la propiedad user sea el id que tenga el payload, entonces con eso podemos obtener ese id que viene en el token creando la constante user e igualando a lo que viene en la request en su propiedad user pero sería bueno que tengamos todo el usuario y no solo su id entonces para regresar toda la información del usuario tenemos que crear un nuevo método en el auth.service.ts que con el id del usuario que viene en el AuthGuard nos regrese toda la información del usuario como en la imagen 4.8 */
    // console.log({ request });
    // const user = request['user'];
    // return user;

    /* aquí se comentan las líneas anteriores ya que solo era para hacer un demostración para la validación del JWT y obtener un usuario pero la finalidad de esta función era obtener todos los usuarios. Lo que se puede hacer es que la lógica comentada la pasemos a otra función para obtener el usuario por id */
    return this.authService.findAll();
  }

  /* en el frontend el checkToken se invocará cada vez que se recarga la página para renovar el token y no se hace solo con la duración del token, es decir, pasando la duración del token el usuario ya no pueda acceder a alguna rutas, porque por ejemplo, un usuario solo puede tener ciertos roles para acceder a una ruta o que no ha recargado la página en 5 horas y la duración del token es de 4 horas entonces en esos casos no se le permitiría el acceso al endpoint y por eso se hace uso del checkToken para que se vaya renovando */
  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() request: Request): LoginResponse {
    /* se coloca como as User ya que la constante user la toma como si fuera tipo any */
    const user = request['user'] as User;

    return {
      user: user,
      token: this.authService.getJsonWebToken({ id: user._id }),
    };
  }

  /* las comentamos porque no estamos usando estos métodos */
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
