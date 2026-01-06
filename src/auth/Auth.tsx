'use client'

import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button'
import { actions } from 'astro:actions'
import { useState } from 'react'
import { cn } from '@/lib/utils.js'

export default function Auth() {
  const [isInvalid, setIsInvalid] = useState(false)
  const [length, setLength] = useState(0)
  return (
    <main className='flex h-screen w-screen flex-1 flex-col items-center justify-center p-4'>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          const { error } = await actions.checkOTP(formData)
          if (error) {
            console.error('Invalid Code')
            setIsInvalid(true)
          } else {
            window.location.href = '/admin'
            setIsInvalid(false)
          }
        }}
        className='flex flex-col gap-4'>
        <h1 className='text-center'>Authentication</h1>
        <Input
          type='text'
          name='otp'
          placeholder='000000'
          onChange={(e) => {
            setLength(e.target.value.length)
            if (isInvalid && e.target.value.length < 6) {
              setIsInvalid(false)
            }
            setIsInvalid(false)}}
          className={cn('bg-white', isInvalid && 'animate-in text-red-500 duration-300')}
        />
        <Button type='submit' disabled={length < 6 || isInvalid}>Unlock</Button>
      </form>
    </main>
  )
}
