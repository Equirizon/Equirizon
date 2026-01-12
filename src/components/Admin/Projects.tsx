'use client'

import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import formSubmissionStatus from '@/hooks/formSubmissionStatus'
import { LoaderCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { actions } from 'astro:actions'

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
  const [errorMsg, setErrorMsg] = useState('An error occured.')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase.from('projects').select('*')
      if (error) {
        console.error('Error fetching projects:', error)
      } else {
        setData({ data })
        setIsMounted(true)
      }
    }
    fetchProjects()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setActuallySubmitted(true)
    const { error } = await supabase.from('projects').insert(values)
    if (error) {
      console.error('Error adding project:', error)
      setErrorMsg('An error occured while adding the project.')
      throw new Error(error.message)
    } else {
      setData((prevData) => ({
        data: prevData.data ? [...prevData.data, values] : [values],
      }))
    }
    setTimeout(() => {
      form.reset()
      setActuallySubmitted(false)
    }, 3000)
  }

  async function deleteProject(title: string) {
    const { error } = await supabase.from('projects').delete().eq('title', title)
    if (error) {
      console.error('Error deleting project:', error)
    } else {
      setData((prevData) => ({
        data: prevData.data?.filter((project) => project.title !== title) || null,
      }))
    }
  }

  const { getStatusElement, setActuallySubmitted } = formSubmissionStatus(form, errorMsg, 'Project added!')

  return (
    <>
      <Button
        variant='outline'
        size='sm'
        className='fixed top-4 right-4'
        onClick={async () => {
          const { error } = await actions.logout()
          if (error) {
            console.error('Logout failed:', error)
            return
          }
          window.location.href = '/admin/'
        }}>
        Logout
      </Button>
      <div className='flex w-[min(90%,40rem))] flex-col gap-12'>
        <div className='mx-auto w-full py-8 md:max-w-4xl'>
          <h2 className='mb-8 text-center text-3xl font-bold text-gray-900'>Displayed Projects</h2>
          <div className={cn('rounded-t-lg bg-white shadow', isMounted && 'rounded-lg')}>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-theme-color-secondary/40'>
                <tr>
                  <th className='rounded-tl-lg px-6 py-3 text-left text-lg font-semibold text-gray-900'>Project</th>
                  <th className='rounded-tr-lg px-6 py-3 text-left text-lg font-semibold text-gray-900'>Description</th>
                </tr>
              </thead>
              {isMounted ? (
                <tbody className='divide-y divide-gray-200 animate-in fade-in-0 duration-500'>
                  {data.data?.map((project, index) => (
                    <tr key={project.title} className='group hover:bg-gray-50'>
                      <td
                        className={cn(
                          'px-6 py-4 text-sm text-gray-900',
                          index + 1 === data.data!.length && 'rounded-b-lg',
                        )}>
                        {project.title}
                      </td>
                      <td
                        className={cn(
                          'relative px-6 py-4 text-sm text-gray-600',
                          index + 1 === data.data!.length && 'rounded-b-lg',
                        )}>
                        {project.description}{' '}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant='outline'
                              size='sm'
                              className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:cursor-pointer'>
                              <X className='text-red-500' strokeWidth={4} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the project &quot;{<b>{project.title}</b>}&quot;? This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
                                onClick={() => deleteProject(project.title)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody className='relative'>
                  <div className='absolute top-1/2 left-1/2 w-full -translate-x-1/2 rounded-b-lg bg-white px-6 py-4 text-center text-gray-500'>
                    <LoaderCircle className='stroke-muted-foreground m-auto animate-spin' />
                  </div>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <Form {...form}>
          <form className='mx-auto w-full rounded-lg bg-white p-6 shadow' onSubmit={form.handleSubmit(onSubmit)}>
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
              <div className='flex flex-row items-center justify-start gap-4 pt-4'>
                <Button
                  type='submit'
                  disabled={
                    (setActuallySubmitted() && form.formState.isSubmitSuccessful) || form.formState.isSubmitting
                  }>
                  Submit
                </Button>
                {getStatusElement()}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
