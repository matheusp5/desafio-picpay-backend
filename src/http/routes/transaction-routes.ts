import { Router } from 'express'
import { TransactionController } from '../controllers/transaction-controller'
import { rateLimiterMiddleware } from '../../middlewares/rate-limiter-middleware'
const transactionRouter = Router()

const controller = new TransactionController()

transactionRouter.post('/', rateLimiterMiddleware, controller.create)
transactionRouter.get('/', controller.find)

export { transactionRouter }
