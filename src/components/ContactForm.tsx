'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { supabase } from '@/utils/supabase/client'
import { Textarea } from './ui/textarea'
import { useState } from 'react'
import formSubmissionStatus from '@/hooks/formSubmissionStatus'

const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must contain at least 3 character(s)')
    .max(20, 'Name must contain at most 20 character(s)'),
  email: z.string().email(),
  message: z
    .string()
    .min(2, 'Message must contain at least 2 character(s)')
    .max(100, 'Message must contain at most 100 character(s)'),
})

export default function ContactForm() {
  const [errorMsg, setErrorMsg] = useState('An error occured.')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const { getStatusElement, setActuallySubmitted } = formSubmissionStatus(form, errorMsg)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setActuallySubmitted(true)
    const { error } = await supabase.from('contact').insert(values)
    if (error) {
      if (error.code === '23505') {
        setErrorMsg('Already submitted.')
      } else {
        setErrorMsg('An error occured.')
      }
      throw new Error(error.message)
    }
    setTimeout(() => {
      form.reset()
      setActuallySubmitted(false)
      setErrorMsg('An error occured.')
    }, 3000)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-accent/75 z-1 flex w-[min(25rem,90vw)] flex-col justify-start gap-5 space-y-8 rounded-2xl p-7 shadow-xl backdrop-blur-md transition-all'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='m-0'>
              <FormLabel className='text-muted-foreground'>Name</FormLabel>
              <FormControl>
                <Input placeholder='Your Name' {...field} className='bg-popover' />
              </FormControl>
              <FormMessage className='animate-in fade-in-0' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='m-0'>
              <FormLabel className='text-muted-foreground'>Email</FormLabel>
              <FormControl>
                <Input placeholder='your@email.com' {...field} className='bg-popover' />
              </FormControl>
              <FormMessage className='animate-in fade-in-0' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem className='m-0'>
              <FormLabel className='text-muted-foreground'>Message</FormLabel>
              <FormControl>
                <Textarea placeholder='message' {...field} className='bg-popover' />
              </FormControl>
              <FormMessage className='animate-in fade-in-0' />
            </FormItem>
          )}
        />
        <div className='flex flex-row items-center justify-start gap-3'>
          <Button
            type='submit'
            disabled={(setActuallySubmitted() && form.formState.isSubmitSuccessful) || form.formState.isSubmitting}>
            Submit
          </Button>
          {getStatusElement()}
        </div>
      </form>
    </Form>
  )
}
