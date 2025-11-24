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
import { Code, ExternalLink, Wrench } from 'lucide-react'
import ImageSkeleton from './ui/image-skeleton'

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
    <div className='relative w-[min(97vw,48rem)]'>
      <Carousel setApi={setApi} className='w-[min(97vw,48rem)]'>
        <CarouselContent>
          {projects.map((project, i) => {
            return (
              <CarouselItem key={i}>
                <div className='mx-6 mb-10'>
                  <Card
                    className={cn(
                      'to-theme-primary-accent from-theme-secondary-accent dark:shadow-theme-color-primary/25 border-none bg-linear-30 transition-all delay-50 duration-700 ease-in-out',
                      current === i + 1
                        ? '-translate-y-0 scale-100 shadow-xl'
                        : 'translate-y-5 scale-90 opacity-20 shadow-none',
                    )}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription className='truncate'>{project.description}</CardDescription>
                      <CardAction>
                        {project['anchor-source'] !== 'wip' ? (
                          <Button size='sm' variant='link'>
                            <a
                              className='flex items-center gap-1'
                              target={project.url.includes('https') ? '_blank' : undefined}
                              rel='noopener noreferrer'
                              href={project.url}>
                              <span className='hidden sm:inline-block'>
                                {project['anchor-source'] === 'link' ? 'View Project' : 'View Source Code'}
                              </span>
                              {project['anchor-source'] === 'link' ? <ExternalLink /> : <Code />}
                            </a>
                          </Button>
                        ) : (
                          <span className='text-muted-foreground inline-flex items-center gap-1'>
                            <p className='text-sm font-medium'>Work In Progress</p>
                            <Wrench size={16} />
                          </span>
                        )}
                      </CardAction>
                    </CardHeader>
                    <CardContent className='flex aspect-square items-center justify-center overflow-hidden sm:aspect-video'>
                      <div className='flex size-full items-center justify-center overflow-hidden rounded-lg'>
                        <ImageSkeleton src={project.srcImage} alt={project.title} />
                      </div>
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
      <div className='bg-theme-color-primary/30 absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-row justify-center gap-1 rounded-full p-1.5'>
        {Array.from({ length: count }).map((_, i) => {
          return (
            <div key={i} className='flex flex-col items-center justify-center'>
              <div
                className={cn(
                  'bg-theme-color-primary size-1.5 rounded-full transition-all duration-300',
                  current === i + 1 ? 'scale-100 opacity-100' : 'scale-40 opacity-0',
                )}
              />
              <div className='bg-accent-foreground/10 absolute size-1.5 rounded-full' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
