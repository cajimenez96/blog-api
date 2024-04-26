# blog-api
Api de un blog desarrollada con node js, express y mongo db

## Configuración de variables de entorno
Antes de utilizar esta aplicación, es necesario configurar las variables de entorno copiando el .env.example y pegarla como .env.local, .env.production y .env.testing

Cargar los valores utilizando la informacion que se encuentra en confluencer sobre la DB.

Vamos a trabajar con dos ambientes (testing y local), el ambiente local es para desarrolo y el testing es para testing.

Para utilizar el ambiente local lo que tienen que hacer es en el archivo .env.local agregar la direccion de la base de datos local, ejecutar el comando npm run dev

Para utilizar el ambiente testing lo que tienen que hacer es en el archivo .env.testing agregar la direccion de la base de datos de MongoDB, ejecutar el comando npm run test
