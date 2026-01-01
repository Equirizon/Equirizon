'use client'

import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'

export default function Projects() {
  type Projects = Array<{
    title: string
    description: string
    image: string
    url: string
    footer: string
    anchor_source: 'link' | 'code' | 'wip'
  }>

  const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().url('Invalid image URL'),
    url: z.string().url('Invalid URL'),
    footer: z.string().min(1, 'Footer is required'),
    anchor_source: z.enum(['link', 'code', 'wip']),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      url: '',
      footer: '',
      anchor_source: 'link',
    },
  })

  const [data, setData] = useState<{ data: Projects | null }>({ data: null })

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from('projects').select('*')
      if (error) {
        console.error('Error fetching projects:', error)
      } else {
        setData({ data })
      }
    }
    fetchProjects()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await supabase.from('projects').insert(values)
    if (error) {
      console.error('Error adding project:', error)
      return
    }
    setTimeout(() => {
      form.reset()
    }, 3000)
  }

  return (
    <div className='min-h-screen px-4 py-12'>
      <div className='mx-auto min-w-2xl max-w-4xl'>
        <h2 className='mb-8 text-center text-3xl font-bold text-gray-900'>Displayed Projects</h2>
        <div className='overflow-hidden rounded-lg bg-white shadow'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-6 py-3 text-left text-lg font-semibold text-gray-900'>Project</th>
                <th className='px-6 py-3 text-left text-lg font-semibold text-gray-900'>Description</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {data.data?.map((project) => (
                <tr key={project.title} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 text-sm text-gray-900'>{project.title}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{project.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Form {...form}>
        <form className='mt-12 rounded-lg bg-white p-8 shadow' onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className='mb-6 text-2xl font-bold text-gray-900'>Add New Project</h3>
          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type='text'
                      placeholder='Title'
                      className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type='text'
                      placeholder='Description'
                      className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type='text'
                      placeholder='Image URL'
                      className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type='text'
                      placeholder='URL'
                      className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='footer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Footer</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type='text'
                      placeholder='Footer'
                      className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='anchor_source'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className='w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'>
                      <option value=''>Select source type</option>
                      <option value='link'>Link</option>
                      <option value='code'>Code</option>
                      <option value='wip'>WIP</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-row items-center justify-start gap-3 my-3'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
