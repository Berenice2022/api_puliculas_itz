var Servers = require('../models/Servers');

exports.create = function (server) {
  try {
    var server = new Servers(server);
    server.save();
    return { server: server, message: 'Servidor guardado correctamente' };
  } catch (error) {
    return { server: null, message: error.message };
  }
};

exports.list = async function (req, resp) {
  try {
    const servers = await Servers.find();
    console.log(servers.json);
    return resp.json(servers);
  } catch (error) {
    return { error: error.message };
  }
};

exports.delete = function (server) {
  try {
    const server = Servers.findOne({ host: server.host, port: server.port });
    if (server) {
      const eliminaServer = Servers.findByIdAndDelete(server._id);
      return { message: 'Server eliminado' };
    }
  } catch (error) {
    return { error: error.message };
  }
};
