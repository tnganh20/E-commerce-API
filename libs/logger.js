const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: process.env.LOGGER_NAME || 'ECOMMERCE.API',
  project_namespace: 'EcommerceProject',
});

module.exports = log;
