import express from 'express'
import {
  applicationLogger,
  enableApplicationLogger,
} from '../configs/application-logger'
import { enableDatabaseLogger } from '../configs/database-logger'
import { ENV } from '../configs/env'
import { enableMorgan } from '../configs/morgan'

import { authRouter } from './routes/auth-routes'
import { transactionRouter } from './routes/transaction-routes'

const app = express()

app.use(express.json())

enableMorgan()

if (ENV.logger.application) {
  enableApplicationLogger()
}
if (ENV.logger.database) {
  enableDatabaseLogger()
}

app.use('/api/auth', authRouter)
app.use('/api/transaction', transactionRouter)

export { app }
