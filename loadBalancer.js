//node .\loadBalancer.js
const http = require('http');
const httpProxy = require('http-proxy');
const hostsController = require('./controllers/serversControllers');
//npm i http-proxy

const appServers = [
  { host: '127.0.0.1', port: 3001 },
  { host: '127.0.0.1', port: 3002 },
  { host: '127.0.0.1', port: 3003 },
  { host: '127.0.0.1', port: 3004 },
  { host: '127.0.0.1', port: 3005 },
  { host: '127.0.0.1', port: 3006 },
  { host: '127.0.0.1', port: 3007 },
];

//PROXY CREADO
const proxy = httpProxy.createProxyServer({});

//Crear una comprobacion de estado.
//COMPROVAR ESTADO DEL SERVIDOR
function comprobarEstado(server) {
  return new Promise((resolve, reject) => {
    http
      .get('http://' + server.host + ':' + server.port, (res) => {
        console.log(res.statusCode);
        if (res.statusCode === 200) {
          resolve();
        } else {
          reject();
        }
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
//Funcion para eliminar una instancia de aplicacion que no esta respondiendo
async function eliminarInstancia() {
  //appServers = hostsController.list();
  console.log(appServers);
  appServers.forEach((server, index) => {
    comprobarEstado(server)
      .then(() => {
        console.log(
          'Servidor ' + server.host + ':' + server.port + ' en ejecucion'
        );
      })
      .catch(() => {
        console.log(
          'Eliminando el servidor ' + server.host + ':' + server.port
        );
        appServers.splice(index, 1);
      });
  });
}

//COmprobar el estado de las instancias por cada cierto intervalo
const intervalo = 8000; //5 segundos
setInterval(eliminarInstancia, intervalo);

//Crear el servidor para el balanceo de carga
const server = http.createServer((req, resp) => {
  //Establecer la regla para el balanceo de carga y la palicacion
  const target = appServers[Math.floor(Math.random() * appServers.length)];

  //Redirijimos la solicitud al servidor desino
  proxy.web(req, resp, {
    target: 'http://' + target.host + ':' + target.port,
  });
});

//MANEJO DE ERRORES DEL PROXY
proxy.on('error', (err, req, resp) => {
  console.log('Proxy error:' + err);
  resp.writeHead(500, { 'Content-Type': 'text/plain' });
  resp.end('Proxy error');
});

//Iniciamos el servidor balanceador de caraga en el puerto 8000
const port = 8000;
server.listen(port, () => {
  console.log('Balanceador de carga escuchando en el puerto: ' + port);
});
