'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import projects from '../data/projects.json'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { ExternalLink } from 'lucide-react'

export default function ProjectsCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className='relative w-[min(95vw,48rem)]'>
      <Carousel setApi={setApi} className='w-[min(95vw,48rem)]'>
        <CarouselContent>
          {projects.map((project, i) => {
            return (
              <CarouselItem key={i}>
                <div className='px-4 py-1'>
                  <Card className='to-theme-primary-accent from-theme-secondary-accent bg-linear-30'>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription className='truncate'>{project.description}</CardDescription>
                      <CardAction>
                        <Button size='sm' variant='link'>
                          <a className='flex items-center gap-1' href={project.url}>
                            <span className='hidden md:inline-block'>View Project</span>
                            <ExternalLink />
                          </a>
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent className='flex items-center justify-center overflow-hidden'>
                      <img
                        src={project.srcImage}
                        alt={project.title}
                        className='aspect-square rounded-lg object-cover italic md:aspect-video md:transition-transform'
                      />
                    </CardContent>
                    <CardFooter className='text-muted-foreground text-sm font-light'>
                      <p className='truncate'>{project.footer}</p>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className='hidden lg:inline-flex' />
        <CarouselNext className='hidden lg:inline-flex' />
      </Carousel>
      {/* <div className='text-muted-foreground bg-theme-color-primary/30 absolute top-5 right-8 rounded-full px-2 py-1 text-center text-xs font-semibold md:hidden'>
        {current}/{count}
      </div> */}
      <div className='bg-theme-color-primary/30 absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-row justify-center gap-1 rounded-full p-1.5 lg:hidden'>
        {Array.from({ length: count }).map((_, i) => {
          return (
            <div
              key={i}
              className={cn(
                'size-1.5 rounded-full transition-colors duration-200',
                current === i + 1 ? 'bg-theme-color-primary' : 'bg-accent-foreground/10',
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
