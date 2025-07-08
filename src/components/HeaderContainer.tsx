'use client'

import throttle from '@/utils/throttle'
import clsx from 'clsx'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'

export default function HeaderContainer({ children }: { children: React.ReactNode }) {
  const { scrollYProgress: scrollY } = useScroll()
  const [onTop, setonTop] = useState(true)

  const throttler = throttle((scroll) => {
    setonTop(scroll === 0)
    console.log(scroll)
  }, 100)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    throttler(latest)
  })

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 flex w-dvw flex-row items-center justify-between text-sm font-medium text-gray-700 duration-150 ease-in-out',
        onTop ? 'px-20 py-9' : 'bg-linear-60 from-fuchsia-100/70 to-sky-100/70 py-2 px-10 shadow-md backdrop-blur-xl',
      )}>
      {children}
    </header>
  )
}
