'use client'

import { useEffect, useState } from 'react'
import { CircleX, Download, LoaderCircle } from 'lucide-react'
import { Button } from '@ui/button'
import { supabase } from '@/utils/supabase/client'

export default function CVButton() {
  const [isMounted, setIsMounted] = useState(false)
  const [cvLink, setCvLink] = useState('')
  const [error, setError] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    async function getCV() {
      const { data: assets, error } = await supabase.from('assets').select('api').eq('name', 'cv').single()
      if (error || !assets?.api) {
        console.error('Failed to fetch CV:', error?.message ?? 'No API link found')
        setError(true)
        return
      }
      setCvLink(assets.api)
      setIsMounted(true)
    }
    getCV()
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isClicked) {
      timeout = setTimeout(() => {
        setIsClicked(false)
      }, 5000)
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isClicked])

  return !error ? (
    !isMounted ? (
      <Button variant='link' disabled>
        Download my CV
        <LoaderCircle className='stroke-muted-foreground animate-spin' />
      </Button>
    ) : !isClicked ? (
      <a href={`${cvLink}?download=bustria-cv.pdf`} download>
        <Button variant='link' onClick={() => setIsClicked(true)}>
          <span className='animate-in fade-in-60'>Download my CV</span>
          <Download className='animate-in fade-in-30 zoom-in-80 duration-300' />
        </Button>
      </a>
    ) : (
      <Button variant='link' disabled>
        Downloading CV...
        <LoaderCircle className='stroke-muted-foreground animate-spin' />
      </Button>
    )
  ) : (
    <Button variant='link' disabled>
      <CircleX className='text-destructive animate-in fade-in-30' />
      <span className='animate-in zoom-in-95 fade-in-60 text-xs ease-out md:text-sm'>
        CV being updated at the moment
      </span>
    </Button>
  )
}
