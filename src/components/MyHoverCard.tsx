import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function MyHoverCard({ children }: { children: string }) {
  const date = new Date()
  const formattedYear = date.toLocaleDateString('en-US', {
    year: 'numeric',
  })

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className='bg-theme-primary-accent text-muted-foreground w-[20rem]' asChild>
        <div className='flex flex-row justify-between gap-3'>
          <Avatar>
            <AvatarImage src='https://github.com/equirizon.png' alt='My GitHub Avatar' />
            <AvatarFallback>EQ</AvatarFallback>
          </Avatar>
          <div className='flex w-full flex-col items-start justify-start gap-1'>
            <span className='text-accent-foreground text-sm font-bold'>@equirizon</span>
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
