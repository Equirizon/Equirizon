import { defineAction } from 'astro:actions'
import { z } from 'astro/zod'
import { authenticator } from 'otplib'
import { TOTP_SECRET } from 'astro:env/server'
import rateLimit from '@/utils/rateLimiter'

const checkBucket = rateLimit({ capacity: 5, refillRate: 0.5, timeout: 1000 * 300 /* 5mins */ })

export const server = {
  checkOTP: defineAction({
    accept: 'form',
    input: z.object({
      otp: z.string(),
    }),
    handler: async ({ otp }, context) => {
      if (!checkBucket()) {
        throw new Error('Rate limited.')
      }
      const secret = TOTP_SECRET
      const token = otp
      const isValid = authenticator.check(token, secret)

      if (!isValid) throw new Error('OTP is incorrect or has expired.')
      context.cookies.set('admin', 'true', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60, // 1 hour
      })
    },
  }),

  logout: defineAction({
    handler: async (_input, context) => {
      context.cookies.delete('admin', {
        path: '/',
      })
    },
  }),
}
