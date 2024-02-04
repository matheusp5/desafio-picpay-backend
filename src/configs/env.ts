import { config } from 'dotenv'
config()

export const ENV = {
  web: {
    port: Number(process.env.WEB_PORT),
  },
  smtp_server: {
    host: process.env.SMTP_SERVER_HOST,
    port: Number(process.env.SMTP_SERVER_PORT),
    crypt: process.env.SMTP_SERVER_CRYPT == 'enable',
    user: process.env.SMTP_SERVER_USER,
    password: process.env.SMTP_SERVER_PASSWORD,
  },
  queues: {
    email: 'emails',
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_INITIAL_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },
  logger: {
    http: process.env.HTTP_LOGGER_SERVICE == 'enable',
    database: process.env.DATABASE_LOGGER_SERVICE == 'enable',
    application: process.env.APPLICATION_LOGGER_SERVICE == 'enable',
  },
  jwt: {
    secret_key: process.env.JWT_SECRET_KEY,
    expires_in: process.env.JWT_EXPIRES_IN,
  },
  rate_limiter: {
    limit: Number(process.env.RATE_LIMIT),
    minutes: Number(process.env.MINUTES_RATE_LIMITER),
  },
  unique_id_length: Number(process.env.UNIQUE_ID_LENGTH),
  password_salt_rounds: Number(process.env.PASSWORD_SALT_ROUNDS),
  mocks: {
    extenal_authorizer: process.env.EXTERNAL_AUTHORIZER_MOCK,
    send_notification: process.env.SEND_NOTIFICATION_MOCK,
  },
}
