import * as joi from 'joi';

export const schemaValidation = joi.object({
  PORT: joi.number().default(3000).required(),
  NODE_DEV: joi.string().default('dev').required(),
  DB_HOST: joi.string().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_LOAD: joi.boolean().default(false).required(),
  DB_SYNC: joi.boolean().default(false).required(),
  DB_SCHEMA: joi.string().required(),
});
