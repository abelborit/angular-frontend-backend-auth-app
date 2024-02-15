/* este archivo es de JavaScript ya que aunque estemos usando TypeScript y al final se transpile a JavaScript no tenemos una forma de hacerlo directamente con TypeScript (sí la hay pero usando paquetes de terceros lo cual aumenta la complejidad e instalación). Este set-env.js se utilizará para leer las variables de entorno del .env */

/* hacer la desestructuración del paquete de NODE de fs de File System para crear, leer, eliminar archivos, etc */
const { writeFileSync, mkdirSync } = require("fs");

/* con esta línea ya me permite leer las variables de entorno con el process.env se puede usar console.log(process.env); para revisar */
require("dotenv").config();
// console.log(process.env);

/* ahora vamor a colocar el path para crear el archivo con las variables de entorno que tenga .env */
const targetPath = "./src/environments/environments.ts";

/* crear el contenido del archivo */
const envFileContent = `
export const environments = {
  base_url: '${process.env["BASE_URL"]}',
  otra_propiedad: '${process.env["OTRA_PROPIEDAD"]}',
};
`;

/* crear la carpeta y como ya estamos usando NODE (angular trabaja dentro del entorno de node) entonces ya hay formas para trabajar con el file system. Este { recursive: true } es para que si el archivo ya existe entonces lo va a sobreescribir */
mkdirSync("./src/environments", { recursive: true });

/* crear el archivo en la dirección colocada y con el contenido que queremos */
writeFileSync(targetPath, envFileContent);
