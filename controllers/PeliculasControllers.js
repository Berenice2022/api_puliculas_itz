//const { request } = require('express');
const Peliculas = require('../models/Peliculas');
const usersControllers = require('./UsersControllers');
//const usersControllers = require('./UsersControllers');

//CRUD

//CREATE
exports.create = async function (req, resp) {
  if (Object.keys(req.query).length > 0) {
    var request = req.query;
  } else if (Object.keys(req.body).length > 0) {
    var request = req.body;
  }
  console.log(request);

  try {
    const saldo = await usersControllers.validaSaldousuario(request);
    if (!saldo) {
      return resp.status(403).json({
        menssage: 'User without sufficient balance to process the request',
      });
    }

    var pelicula = new Peliculas(request);
    await pelicula.save();
    //await usersControllers.actualizarSaldoUsuario(req);
    return resp.json({ pelicula, mensaje: 'Movie saved successfully' });
  } catch (error) {
    return resp.status(500).json({
      message: 'Error saving movie',
      error: error,
    });
  }
};

//GET ALL
exports.list = async function (req, resp) {
  try {
    const saldo = await usersControllers.validaSaldousuario(req);

    if (!saldo) {
      return resp.status(403).json({
        menssage: 'User without sufficient balance to process the request',
      });
    }
    const peliculas = await Peliculas.find();
    //await usersControllers.actualizarSaldoUsuario(req);
    return resp.json(peliculas);
  } catch (error) {
    return resp.status(500).json({
      message: 'Error getting all the movies',
      error: error,
    });
  }
};

//FUNCTION TO UPDATE
exports.update = async function (req, resp) {
  if (Object.keys(req.query).length > 0) {
    var request = req.query;
  } else if (Object.keys(req.body).length > 0) {
    var request = req.body;
  }
  console.log(request);

  try {
    const saldo = await usersControllers.validaSaldousuario(request);
    if (!saldo) {
      return resp.status(403).json({
        menssage: 'User without sufficient balance to process the request',
      });
    }

    const peliculaAct = await Peliculas.findByIdAndUpdate(
      req.params.id,
      request,
      {
        //const movieAct = await Movies.findByIdAndUpdate(req.params.id, req.query, {
        new: true,
      }
    );

    if (!peliculaAct) {
      return resp.status(404).json({ error: 'Movie not found' });
    } else {
      //await usersControllers.actualizarSaldoUsuario(req);
      resp.status(200).json({ peliculaAct, msj: 'Movie updated successfully' });
    }
  } catch (error) {
    return resp.status(500).json({
      message: 'Error updating the movie',
      error: error,
    });
  }
};

//DELETE
exports.delete = async function (req, resp) {
  try {
    if (Object.keys(req.query).length > 0) {
      var request = req.query;
    } else if (Object.keys(req.body).length > 0) {
      var request = req.body;
    }
    console.log(request);

    const saldo = await usersControllers.validaSaldousuario(req);
    if (!saldo) {
      return resp.status(403).json({
        menssage: 'User without sufficient balance to proccess the request',
      });
    }

    const deletePelicula = await Peliculas.findByIdAndDelete(req.params.id);
    if (!deletePelicula) {
      return resp.status(404).json({ error: 'Movie not found' });
    } else {
      //await usersControllers.actualizarSaldoUsuario(req);
      resp.status(202).json({ msj: 'Movie deleted successfully' });
    }
  } catch (error) {
    return resp.status(500).json({
      message: 'Error deleting movie',
      error: error,
    });
  }
};

//Function to find by id
exports.show = async function (req, resp) {
  try {
    const saldo = await usersControllers.validaSaldousuario(req);
    if (!saldo) {
      return resp.status(403).json({
        menssage: 'User without sufficient balance to procces the request',
      });
    }

    const pelicula = await Peliculas.findById(req.params.id);
    if (!pelicula) {
      return resp.status(404).json({ error: 'Movie not found' });
    } else {
      //await usersControllers.actualizarSaldoUsuario(req);
      return resp.status(202).json(pelicula);
    }
  } catch (error) {
    return resp.status(500).json({
      message: 'Error showing movie',
      error: error,
    });
  }
};
