const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const logger = require('./libs/logger');
const router = require('./routes/route');

const app = express();

/**
 * Load environment variables
 */
require('./libs/load-env');

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());

/**
 * Enable CORS
 */
app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/api/user/v1', router);

app.use((err, req, res, next) => {
  if (err.name === 'JsonSchemaValidation') {
    res.status(400);

    const responseData = {
      statusText: 'Bad Request',
      jsonSchemaValidation: true,
      validations: err.validations,
    };
    if (req.xhr || req.get('Content-Type') === 'application/json') {
      res.json(responseData);
    }
  } else {
    next(err);
  }
});

app.listen(app.get('port'), () => {
  logger.info(`API server is listening at port${app.get('port')}`);
});
