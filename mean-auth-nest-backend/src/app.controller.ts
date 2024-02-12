import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /* aquí tenemos la petición @Get() que tiene un método getHello() que se conecta a un servicio mediante una inyección de dependencias. Este servicio es el que está en el archivo app.service.ts */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
