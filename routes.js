const express = require('express');
const peliculasControllers = require('./controllers/PeliculasControllers');
const authenticateJWT = require('./authMiddleware');
const usersControllers = require('./controllers/UsersControllers');
const recursosControllers = require('./controllers/recursosController');

const router = express.Router();

//127.0.0.1:3001/users?email=bere@gmail.com&password=contraseña123
router.post('/users', async (req, resp) => {
  usersControllers.create(req, resp);
});

//Rute to solicited token of autentication
//127.0.0.1:3000/get-token?email=bere@gmail.com&api_key=kE6GQñ6LÑi0yJñJ
router.post('/get-token', async (req, res) => {
  if (Object.keys(req.query).length > 0) {
    var request = req.query;
  } else if (Object.keys(req.body).length > 0) {
    var request = req.body;
  }

  const { email, api_key } = request;
  try {
    const result = await usersControllers.authenticate(email, api_key);
    res.json(result);
    console.log(result);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
});

//GET Movie
//127.0.0.1:3000/movies  IMPORT ADD EN HEADERS THE TOKEN
router.get('/peliculas', authenticateJWT, async (req, resp) => {
  peliculasControllers.list(req, resp);
});

//GET mivie by ID
//http://localhost:3000/movies/65d553a6b0ccea28cca299e7
//http://localhost:3000/movies?title=El cazador
router.get('/peliculas/:id', authenticateJWT, async (req, resp) => {
  peliculasControllers.show(req, resp);
});

//http://localhost:3000/movies?title=The Rock &author=Sonnyc Trinity &year=2024
router.post('/peliculas', authenticateJWT, async (req, resp) => {
  peliculasControllers.create(req, resp);
});

//UPDATE
//http://localhost:3000/movies/65d553a6b0ccea28cca299e7?title=El cazador de blanca nieves
router.put('/peliculas/:id', authenticateJWT, async (req, resp) => {
  peliculasControllers.update(req, resp);
});

//DELETE
//http://localhost:3000/movies/65d553a6b0ccea28cca299e7
router.delete('/peliculas/:id', authenticateJWT, async (req, resp) => {
  peliculasControllers.delete(req, resp);
});

//Rutes to the manage of seccion
router.get('/login', async (req, resp) => {
  usersControllers.token_login(req, resp);
});

router.post('/login', async (req, resp) => {
  usersControllers.login(req, resp);
});

router.post('/agregarSaldo', async (req, resp) => {
  usersControllers.actualizarSaldoUsuario(req, resp);
});

router.post('/logout', async (req, resp) => {
  usersControllers.logout(req, resp);
});

//Ruta para obtener recursos
router.get('/recursos', async (req, resp) => {
  recursosControllers.obtenerRecursos(req, resp);
});

//
router.use(express.static('public'));
module.exports = router;
