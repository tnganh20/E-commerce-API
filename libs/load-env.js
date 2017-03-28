const dotenv = require('dotenv');

if (!process.env.NO_LOAD_ENV_FILE) {
  dotenv.load({ path: `.env.${process.env.NODE_ENV || 'development'}` });
}