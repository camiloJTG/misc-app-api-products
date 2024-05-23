import * as joi from 'joi';

export const schemaValidation = joi.object({
  PORT: joi.number().default(3000).required(),
  NODE_DEV: joi.string().default('dev').required(),
  APP_HOST: joi.string().default('localhost:3000').required(),
  DB_HOST: joi.string().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_LOAD: joi.boolean().default(false).required(),
  DB_SYNC: joi.boolean().default(false).required(),
  DB_SCHEMA: joi.string().required(),
  SHORTENER_LENGTH: joi.number().default(10).required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRE: joi.string().default('60s').required(),
});
