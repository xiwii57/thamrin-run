import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function rateLimit(key: string, limit: number, windowSeconds: number) {
    const count = await redis.incr(key)
    if (count === 1) {
        await redis.expire(key, windowSeconds)
    }
    return { success: count <= limit }
}
