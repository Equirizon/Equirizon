/**
 * Creates a token bucket rate limiter with automatic timeout on exhaustion.
 *
 * @param {Object} config - Configuration object for the token bucket
 * @param {number} config.capacity - Maximum number of tokens the bucket can hold
 * @param {number} config.refillRate - Number of tokens to add per second
 * @param {number} config.timeout - Duration in milliseconds to block requests when bucket is empty
 * @returns {Function} A function that returns true if a request is allowed, false otherwise
 *
 * @example
 * // Create a rate limiter allowing 10 requests per second with 1 second timeout
 * const limiter = createTokenBucket({ capacity: 10, refillRate: 10, timeout: 1000 });
 * if (limiter()) {
 *   // Request is allowed
 * }
 *
 * @remarks
 * - Tokens are refilled continuously based on elapsed time
 * - When tokens are exhausted, all requests are blocked for the specified timeout period
 * - After timeout expires, the bucket resets to full capacity
 * - Each successful request consumes exactly 1 token
 */
export default function createTokenBucket({
  capacity,
  refillRate,
  timeout,
}: {
  capacity: number
  refillRate: number
  timeout: number
}): () => boolean {
  let tokens = capacity
  let lastRefill = Date.now()
  let isTimeout = false
  let timeoutStart: number

  return function allowRequest() {
    const now = Date.now()

    if (isTimeout) {
      if (now - timeoutStart >= timeout) {
        // Timeout expired → reset bucket
        tokens = capacity
        lastRefill = now
        isTimeout = false
      } else {
        return false // still in timeout
      }
    }

    // Refill tokens based on elapsed time
    const elapsed = (now - lastRefill) / 1000
    tokens = Math.min(capacity, tokens + elapsed * refillRate)
    lastRefill = now

    if (tokens >= 1) {
      tokens -= 1
      return true // request allowed
    } else {
      // Bucket overflow → start timeout
      isTimeout = true
      timeoutStart = now
      return false
    }
  }
}

// Usage for your admin login
// const adminBucket = createTokenBucket({
//   capacity: 5, // 5 tokens
//   refillRate: 1, // 1 token/sec
//   timeout: 5 * 60 * 1000, // 5 minutes
// })

// console.log(adminBucket()) // true/false depending on state
