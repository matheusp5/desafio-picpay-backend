import { Redis } from 'ioredis'
import { ENV } from './env'

const redisClient = new Redis({
  host: ENV.redis.host,
  //password: ENV.redis.password,
  port: ENV.redis.port,
})

export { redisClient }
