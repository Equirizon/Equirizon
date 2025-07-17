'use client'

import { cn } from '@/lib/utils'
import throttle from '@/utils/throttle'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

export default function HeaderContainer({ children }: { children: React.ReactNode }) {
  const { scrollYProgress: scrollY } = useScroll()
  const [onTop, setonTop] = useState(true)

  const throttler = throttle((scroll) => {
    setonTop(scroll === 0)
  }, 100)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    throttler(latest)
  })

  return (
    <header
      className={cn(
        'text-muted-foreground fixed top-0 left-0 z-10 flex w-full flex-row items-center justify-between p-3 text-sm font-medium duration-250 ease-in-out',
        onTop
          ? 'bg-mu lg:p-12 xl:px-[calc((100%-70rem)/2)]'
          : 'bg-linear-60 from-fuchsia-200/70 to-sky-200/70 shadow-md backdrop-blur-xl lg:px-12 xl:px-24 dark:from-fuchsia-950/70 dark:to-indigo-950/70',
      )}>
      {children}
    </header>
  )
}
