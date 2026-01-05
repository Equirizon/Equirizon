import { defineMiddleware } from 'astro:middleware'
import { _startsWith } from 'zod/v4/core'

export const onRequest = defineMiddleware((context, next) => {
  const route = context.url.pathname
  if (!context.cookies.get('admin') && /^\/admin[\/]*$/.test(route)) {
    return context.redirect('/admin/auth')
  }
  if (context.cookies.get('admin') && /^\/admin\/auth(\/|\?){0,1}(otp){0,1}(=[0-9a-zA-Z]{0,6})*$/.test(route)) {
    return context.redirect('/admin')
  }
  return next()
})
