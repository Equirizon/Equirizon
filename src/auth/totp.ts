import { authenticator } from 'otplib'
import { TOTP_SECRET } from 'astro:env/server'

export default function totp(formData: FormData) {
  const secret = TOTP_SECRET
  const token = formData.get('otp') as string
  try {
    const isValid = authenticator.check(token, secret)
  } catch (err) {
    // Possible errors
    // - options validation
    // - "Invalid input - it is not base32 encoded string" (if thiry-two is used)
    console.error(err)
  }
}
