# blog-api
Api de un blog desarrollada con node js, express y mongo db

## Configuración de variables de entorno
Antes de utilizar esta aplicación, es necesario configurar las variables de entorno copiando el .env.example y pegarla como .env.local y .env.production 

Cargar los valores utilizando la informacion que se encuentra en confluencer sobre la DB.

Vamos a trabajar con dos ambientes (production y local), el ambiente local es para desarrolo y el production es para produccion.

Para utilizar el ambiente local lo que tienen que hacer es en el archivo .env.local agregar la direccion de la base de datos local, ejecutar el comando npm run dev

Para utilizar el ambiente production lo que tienen que hacer es en el archivo .env.production agregar la direccion de la base de datos de MongoDB, ejecutar el comando npm run start