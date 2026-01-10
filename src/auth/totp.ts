import { authenticator } from 'otplib'
import { TOTP_SECRET } from 'astro:env/server'

export default function totp() {
  const secret = TOTP_SECRET
  const token = '000000'
  let isValid
  try {
    isValid = authenticator.check(token, secret)
  } catch (err) {
    // Possible errors
    // - options validation
    // - "Invalid input - it is not base32 encoded string" (if thiry-two is used)
    console.error(err)
  }
  return isValid
}
