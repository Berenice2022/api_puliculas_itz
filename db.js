var mongoose = require('mongoose');
var MONGO_URL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/db_peliculas';
//process.env.MONGO_URL ||
//'mongodb://bortiz:mama123anita@docdb-2024-03-14-01-25-49.cluster-crcy6usmaz4f.us-east-2.docdb.amazonaws.com:27017/db_libreria?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';

mongodb: mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', function () {
  console.log('Conectado a la base de datos ' + MONGO_URL);
});

mongoose.connection.on('error', function (err) {
  console.log('Error al conectar la base de datos' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Desconectado de la base de datos');
});
