# blog-api
Api de un blog desarrollada con node js, express y mongo db

## Configuración de variables de entorno
Antes de utilizar esta aplicación, es necesario configurar las variables de entorno copiando el .env.example y pegarla como .env. 

Cargar los valores utilizando la informacion que se encuentra en confluencer sobre la DB.

Vamos a trabajar con dos ambientes (global y local), el ambiente local es para desarrolo y ambiente global es para produccion.

Para utilizar el ambiente local lo que tienen que hacer es en el archivo .env agregar la direccion de la base de datos local, copiar y pegar el index.js y reemplazarlo por index-local.js y cambiar el argumento de la funcion connection por la variable de entorno CONNECTION_STRING_LOCAL 