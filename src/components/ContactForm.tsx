'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { supabase } from '@/utils/supabase/client'
import { Textarea } from './ui/textarea'
import { Check, LoaderCircle, X } from 'lucide-react'
import { useState } from 'react'

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
  const [actuallySubmitted, setActuallySubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('An error occured.')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  function formSubmissionStatus() {
    const state = form.formState

    return state.isSubmitSuccessful && !state.isSubmitting ? (
      <span className='animate-pop-in-out flex flex-row items-center gap-2 text-sm font-semibold text-green-700'>
        <Check className='animate-pop-in-out stroke-green-700' /> Submitted!
      </span>
    ) : state.isSubmitting ? (
      <LoaderCircle className='stroke-muted-foreground animate-spin' />
    ) : !state.isSubmitting && !state.isSubmitSuccessful && actuallySubmitted ? (
      <span className='text-destructive animate-in fade-in zoom-in-90 flex flex-row items-center gap-2 text-sm font-semibold'>
        <X className='animate-in fade-in zoom-in-90 stroke-red-600' />
        {errorMsg}
      </span>
    ) : (
      ''
    )
  }

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
    }, 3000)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-[min(25rem,90vw)] flex-col justify-start gap-5 space-y-8 transition-all p-7 bg-accent/75 backdrop-blur-md z-1 shadow-xl rounded-2xl'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='m-0'>
              <FormLabel className='text-muted-foreground'>Name</FormLabel>
              <FormControl>
                <Input placeholder='Your Name' {...field} className='bg-popover'/>
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
                <Input placeholder='your@email.com' {...field} />
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
                <Textarea placeholder='message' {...field} />
              </FormControl>
              <FormMessage className='animate-in fade-in-0' />
            </FormItem>
          )}
        />
        <div className='flex flex-row items-center justify-start gap-3'>
          <Button
            type='submit'
            disabled={(actuallySubmitted && form.formState.isSubmitSuccessful) || form.formState.isSubmitting}>
            Submit
          </Button>
          {formSubmissionStatus()}
        </div>
      </form>
    </Form>
  )
}
