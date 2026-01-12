'use client'

import { cn } from '@/lib/utils'
import { supabase } from '@/utils/supabase/client'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Contact() {
  const [data, setData] = useState<{
    data: Array<{ id: number; name: string; email: string; message: string }> | null
  }>({ data: null })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    async function fetchContacts() {
      const { data, error } = await supabase.from('contact').select('*').order('created_at', { ascending: false })
      if (error) {
        console.error('Error fetching contacts:', error)
      } else {
        setData({ data })
        setIsMounted(true)
      }
    }
    fetchContacts()
  }, [])

  return (
    <div className='mx-auto w-[min(90%,40rem))] py-8 md:max-w-4xl'>
      <h2 className='mb-8 text-center text-3xl font-bold text-gray-900'>Inbox</h2>
      <div className={cn('rounded-t-lg bg-white shadow', isMounted && 'overflow-x-auto rounded-lg')}>
        <table className='w-full divide-y divide-gray-200 overflow-auto'>
          <thead className='bg-theme-color-primary/40'>
            <tr>
              <th className='px-6 py-3 rounded-tl-lg text-left text-lg font-semibold text-gray-900'>Name</th>
              <th className='px-6 py-3 text-left text-lg font-semibold text-gray-900'>Email</th>
              <th className='px-6 py-3 rounded-tr-lg text-left text-lg font-semibold text-gray-900'>Message</th>
            </tr>
          </thead>
          {isMounted ? (
            <tbody className='divide-y divide-gray-200 animate-in fade-in-0 duration-500'>
              {data.data?.map((contact) => (
                <tr key={contact.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 text-sm text-gray-900'>{contact.name}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{contact.email}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{contact.message}</td>
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
  )
}
