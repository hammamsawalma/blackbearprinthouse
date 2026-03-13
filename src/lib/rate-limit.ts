/**
 * In-memory sliding-window rate limiter.
 * 
 * Usage:
 *   const limiter = rateLimit({ interval: 60_000, uniqueTokenPerInterval: 500 });
 *   const { success } = await limiter.check(ip, maxRequests);
 * 
 * NOTE: In-memory only — resets on restart, single-instance only.
 * For multi-instance production, replace with Redis (@upstash/ratelimit).
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitOptions {
  /** Time window in milliseconds (default: 60_000 = 1 minute) */
  interval?: number;
  /** Max unique tokens (IPs) tracked before oldest is evicted */
  uniqueTokenPerInterval?: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export function rateLimit(options: RateLimitOptions = {}) {
  const { interval = 60_000, uniqueTokenPerInterval = 500 } = options;
  const tokenCache = new Map<string, RateLimitEntry>();

  // Periodic cleanup to prevent memory leaks (every 5 minutes)
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of tokenCache) {
      if (now > entry.resetTime) {
        tokenCache.delete(key);
      }
    }
  }, 5 * 60_000);

  // Allow GC to clean up the interval
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return {
    check(token: string, limit: number): RateLimitResult {
      const now = Date.now();
      const entry = tokenCache.get(token);

      // New token or expired window
      if (!entry || now > entry.resetTime) {
        // Evict oldest if at capacity
        if (tokenCache.size >= uniqueTokenPerInterval) {
          const firstKey = tokenCache.keys().next().value;
          if (firstKey) tokenCache.delete(firstKey);
        }

        tokenCache.set(token, { count: 1, resetTime: now + interval });
        return { success: true, limit, remaining: limit - 1, reset: now + interval };
      }

      // Within window
      entry.count += 1;
      const remaining = Math.max(0, limit - entry.count);
      const success = entry.count <= limit;

      return { success, limit, remaining, reset: entry.resetTime };
    },
  };
}

// ── Pre-configured limiters for different endpoints ──

/** Login: 5 attempts per minute per IP */
export const loginLimiter = rateLimit({ interval: 60_000 });

/** Checkout: 3 attempts per minute per IP */
export const checkoutLimiter = rateLimit({ interval: 60_000 });

/** Contact/Quote forms: 5 per minute per IP */
export const formLimiter = rateLimit({ interval: 60_000 });

/** File upload: 10 per minute per IP */
export const uploadLimiter = rateLimit({ interval: 60_000 });

/**
 * Extract client IP from a NextRequest.
 * Checks X-Forwarded-For first (behind proxy/CDN), then falls back to
 * x-real-ip, then a generic fallback.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}
