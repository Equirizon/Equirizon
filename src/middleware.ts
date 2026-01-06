import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
  const route = context.url.pathname
  const isAdmin = context.cookies.get('admin')
  if (!isAdmin && /^\/admin[\/]*$/.test(route)) {
    return context.redirect('/admin/auth')
  }
  if (isAdmin && /^\/admin\/auth(\/|\?){0,1}(otp){0,1}(=[0-9a-zA-Z]{0,6})*$/.test(route)) {
    return context.redirect('/admin')
  }
  return next()
})
