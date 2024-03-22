//Book Models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema definido de la libreria
const serversSchema = new Schema({
  host: String,
  port: String,
});

//Definimos el modelo del libro
const Servers = mongoose.model('Servers', serversSchema);
module.exports = Servers;
