/* PASO 1: definir cómo queremos que luzcan nuestros usuarios */
// export class User {
//   /* NOTA: mongo creará automáticamente el _id de tipo string, es decir _id: string */
//   email: string;
//   name: string;
//   password: string;
//   isUserActive: boolean;
//   roles: string[];
// }

/* PASO 2: crearlo como un equema para decirle a Mongoose que podrá grabar objetos en la base de datos que luzcan como esta entidad y todo eso se hace añadiendo el decorador @Schema(). Luego definir las propiedades de la clase según cómo queremos que luzcan en la base de datos y en este caso todas serán propiedades pero cada una tendrá características diferentes */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  /* NOTA: mongo creará automáticamente el _id de tipo string, es decir _id: string */
  /* aquí se está colocando solo la propiedad para que al momento de registrar no nos marque un error ya que al final de cuentas mongo creará el _id */
  _id?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ minlength: 6, required: true })
  password?: string;

  @Prop({ default: true })
  isUserActive: boolean;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];
}

/* PASO 3: al final de definir todo como queremos faltaría proporcionar el esquema, es decir, que la base de datos pueda recibir este esquema y crearse la definición en la base de datos para que la podamos utilizar */
export const UserSchema = SchemaFactory.createForClass(User);

/* PASO 4: con todo esto ya terminamos la denifición de nuestra entidad/esquema y ya tenemos todo lo necesario para trabajar la base de datos con estos usuarios pero como último paso sería colocar en el módulo auth.module.ts en los imports poner el MongooseModule.forFeature(exponer el o los esquemas para que lo podamos usar a nivel de módulo) */
/* darse cuenta también que la clase se llama User pero en Mongo Compass lo colocará en plural como Users ya que como es una colección y una colección es un conjunto de varios elementos entonces lo coloca en plural */
