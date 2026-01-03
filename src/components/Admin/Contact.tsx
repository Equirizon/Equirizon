'use client'

import { supabase } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Contact() {
  const [data, setData] = useState<{ data: Array<{ id: number; name: string; email: string; message: string }> | null }>({ data: null })
  useEffect(() => {
    async function fetchContacts() {
      const { data, error } = await supabase.from('contact').select('*').order('created_at', { ascending: false })
      if (error) {
        console.error('Error fetching contacts:', error)
      } else {
        setData({ data })
      }
    }
    fetchContacts()
  }, [])

  return (
    <div className='px-4 py-8'>
      <div className='mx-auto min-w-2xl max-w-4xl'>
        <h2 className='mb-8 text-3xl font-bold text-gray-900 text-center'>Inbox</h2>
        <div className='overflow-hidden rounded-lg bg-white shadow'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-theme-color-primary/40'>
              <tr>
                <th className='px-6 py-3 text-left text-lg font-semibold text-gray-900'>Name</th>
                <th className='px-6 py-3 text-left text-lg font-semibold text-gray-900'>Email</th>
                <th className='px-6 py-3 text-left text-lg font-semibold text-gray-900'>Message</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {data.data?.map((contact) => (
                <tr key={contact.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 text-sm text-gray-900'>{contact.name}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{contact.email}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
