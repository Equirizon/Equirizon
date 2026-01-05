'use client'

import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button'
import { actions } from 'astro:actions'

export default function Auth() {
  return (
    <main className='flex h-screen w-full flex-1 flex-col items-center justify-center p-4'>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          const { error } = await actions.checkOTP(formData)
          if (error) {
            console.error('Invalid Code')
          } else {
            window.location.href = '/admin'
          }
        }}
        className='flex flex-col gap-4'>
        <h1 className='text-center'>Authentication</h1>
        <Input type='text' name='otp' placeholder='000000' className='bg-white' />
        <Button type='submit'>Submit</Button>
      </form>
    </main>
  )
}
