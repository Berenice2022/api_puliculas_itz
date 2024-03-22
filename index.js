//nomp init
//npm install mongoose
//npm install express body-parser

//PRACTICA 6
//npm install swagger-jsdoc swagger-ui-express

//PARA CORRER nodemon .\index.js

//Practica 7.1
//npm install express-rate-limit
//npm install jsonwebtoken
//npm i swagger-themes
//npm install ejs

const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const { SwaggerTheme } = require('swagger-themes');

require('./db');

const routes = require('./routes');

const app = express();
const port = 3000;

//Motor de plantillas
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
app.set('view engine', 'ejs');
//Ajustar las rutas segun las estructura de nuestra carpeta
app.set('views', path.join(__dirname, 'views'));

//LIMITAR LAS  ONEXIONES POR TIEMPO DETERMINADO
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, //coresponde a 5 minutos
  max: 50, //limitar el numero de solicitudes o peticiones
  message:
    'You had exceeded the allowed request limit, please wait five minutes.',
});

app.use(limiter);

//Parseamos a formato json todas la solicitudes
//Parseamos la solicitud y limitamos el tamaño de las solicitudes
app.use(bodyParser.json({ limit: '500kb' }));

//Rutas para el CRUD de
app.use(routes);

//Configuramos nuestro tema de swagger
const theme = new SwaggerTheme();

//Configuracion de swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Servicio REST de Peliculas',
      description: 'API REST para administrar peliculas',
      version: '1.0.0',
      contact: {
        name: 'Berenice',
        email: 'Berenice@hotmial.com',
        url: 'https://ejemplo.com/support',
      },
      termsOfService: 'https://ejemplo.com/terms',
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description:
          'Añade tu token de seguridad en la cabecera de la solicitud',
      },
    },
    swagger_ui: {
      theme: 'modern',
    },
  },
  apis: ['doc.js'],
};

const options = {
  explorer: true,
  customCss: theme.getBuffer('material'), //'material'
};

//Iniciamos la documentacion de nuestro servicio
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(
  '/pelicula-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, options)
);

//exportamos la aplicacion para poder ser utilizada en otros archivos
module.exports = app;

//Iniciamos el servidor
/*
app.listen(port, () => {
  console.log('Servidor escuchando en el puerto:' + port);
});
*/
