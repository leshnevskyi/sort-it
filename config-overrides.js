const WorkerPlugin = require('worker-plugin');

module.exports = config => {
  config.plugins.push(new WorkerPlugin());
  
  return config;
};