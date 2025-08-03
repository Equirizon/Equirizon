'use client'

import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'
import { FileImage } from 'lucide-react'
import { useState } from 'react'

interface ImageSkeletonProps extends React.ComponentProps<'div'> {
  src: string
  alt: string
}

export default function ImageSkeleton({ src, alt, className, ...props }: ImageSkeletonProps) {
  const [loading, setLoading] = useState(true)
  return (
    <div className='relative size-full'>
      {loading && (
        <Skeleton className={cn('flex size-full items-center justify-center', className)} {...props}>
          <FileImage className='size-1/8' />
        </Skeleton>
      )}
      <img
        src={src}
        alt={alt}
        loading='lazy'
        decoding='async'
        className={cn(
          'absolute inset-0 top-1/2 aspect-auto -translate-y-1/2 rounded-lg object-cover italic transition-opacity duration-300 lg:size-full',
          loading ? 'opacity-0' : 'opacity-100',
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
