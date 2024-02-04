import Redis from 'ioredis'
import { ENV } from '../configs/env'

type Result = {
  limit: number
  remaining: number
  success: boolean
}

const limit = ENV.rate_limiter.limit
const duration = ENV.rate_limiter.minutes

const limitRate = async (client: Redis, ip: string): Promise<Result> => {
  const key = `rate_limit:${ip}`
  const currentCount = await client.get(key)
  const count = parseInt(currentCount as string, 10) || 0
  if (count == limit) {
    return { limit, remaining: limit - count, success: false }
  }
  client.incr(key)
  client.expire(key, duration)
  return { limit, remaining: limit - (count + 1), success: true }
}

export { limitRate }
