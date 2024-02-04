import { createTransport } from 'nodemailer'
import { ENV } from './env'

const mailerTransporter = createTransport({
  host: ENV.smtp_server.host,
  port: ENV.smtp_server.port,
  secure: ENV.smtp_server.crypt,
  auth: {
    user: ENV.smtp_server.user,
    pass: ENV.smtp_server.password,
  },
})

export { mailerTransporter }
