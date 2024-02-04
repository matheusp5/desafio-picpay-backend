import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller'
import { rateLimiterMiddleware } from '../../middlewares/rate-limiter-middleware'

const authRouter = Router()

const controller = new AuthController()
authRouter.post('/login', rateLimiterMiddleware, controller.login)
authRouter.post('/register', rateLimiterMiddleware, controller.register)
authRouter.post('/decode', rateLimiterMiddleware, controller.decode)

export { authRouter }
