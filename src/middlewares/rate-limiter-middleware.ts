import { NextFunction, Request, Response } from 'express'
import { limitRate } from '../services/rate-limiter-service'
import { redisClient } from '../configs/redis'
import { StatusCode } from '../enums/status-code'

const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await limitRate(redisClient, req.ip as string)
  if (result.success) {
    next()
  } else {
    res.status(StatusCode.TOO_MANY_REQUESTS).send({
      err: 'Too Many Requests',
    })
  }
}

export { rateLimiterMiddleware }
