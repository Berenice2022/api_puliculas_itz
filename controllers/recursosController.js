//npm i os-utils
const os = require('os');
const osUtils = require('os-utils');

exports.obtenerRecursos = async function (req, resp) {
  const obtenerUsoCPU = () => {
    return new Promise((resolve, reject) => {
      osUtils.cpuUsage((cpuUsage) => {
        resolve(cpuUsage);
      });
    });
  };
  //Usar el await para esperarar que se resuelva la promesa
  const usoCPU = await obtenerUsoCPU();

  const usoMemoria = {
    total: os.totalmem(),
    libre: os.freemem(),
    uso: os.totalmem() - os.freemem(),
  };

  resp.json({ usoMemoria, usoCPU });
};
