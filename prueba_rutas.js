const express = require('express');
const router = express.Router();

module.exports = function (port) {
  router.get('/', (req, resp) => {
    resp.send('El puerto de esta palicacion es: ' + port);
  });
  return router;
};
