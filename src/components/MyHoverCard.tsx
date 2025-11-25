import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import type { JSX } from 'react'

export default function MyHoverCard(): JSX.Element {
  const date = new Date()
  const formattedYear = date.toLocaleDateString('en-US', {
    year: 'numeric',
  })

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href='https://github.com/Equirizon'>
          <Button variant='link' className='px-1 text-xs font-bold' size='sm'>
            @equirizon
          </Button>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className='bg-theme-primary-accent text-muted-foreground w-[20rem]' asChild>
        <div className='flex flex-row justify-between gap-3'>
          <Avatar>
            <AvatarImage src='https://github.com/equirizon.png' alt='My GitHub Avatar' />
            <AvatarFallback>EQ</AvatarFallback>
          </Avatar>
          <div className='flex w-full flex-col items-start justify-start gap-1'>
            <a href='https://github.com/Equirizon'>
              <Button variant='link' className='p-0 h-auto'>
                <span className='text-accent-foreground text-sm font-bold'>@equirizon</span>
              </Button>
            </a>
            <p className='text-accent-foreground text-xs text-pretty'>
              Brandon Bustria — Software Engineer, Learning Music, Aspiring artist.
            </p>
            <span className='text-muted-foreground text-xs'>{formattedYear}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
