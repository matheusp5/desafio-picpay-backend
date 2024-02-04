import { Router } from 'express'
import { TransactionController } from '../controllers/transaction-controller'
const transactionRouter = Router()

const controller = new TransactionController()

transactionRouter.post('/', controller.create)
transactionRouter.get('/', controller.find)

export { transactionRouter }
