var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema definition of movie
const peliculaSchema = new Schema({
  titulo: String,
  autor: String,
  genero: String,
  lenguage: String,
  duracion: String,
  año: Number,
  sinopsis: String,
  precio: Number,
});

//movie
const Pelicula = mongoose.model('Pelicula', peliculaSchema);
module.exports = Pelicula;
