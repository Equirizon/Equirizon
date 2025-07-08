'use client'

import throttle from '@/utils/throttle'
import { useScroll, useMotionValueEvent, motion, useTransform, MotionValue, useSpring } from 'motion/react'
import { useState } from 'react'

export default function HeroImage() {
  const { scrollYProgress } = useScroll()
  const [parallax, setParallax] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setParallax(value * 200)
  })

  return (
    <div className='relative aspect-square w-lg overflow-clip'>
      <svg
        className='pointer-events-none absolute top-0 left-0 z-10 h-full w-full'
        viewBox='0 0 512 512'
        preserveAspectRatio='xMidYMid meet'>
        <defs>
          <mask id='scrollMask' maskUnits='userSpaceOnUse' x='0' y='0' width='512' height='512'>
            <rect width='512' height='512' />
            <polygon
              points='458.01 139.37 458.01 372.63 256 489.26 53.99 372.63 53.99 139.37 256 22.74 458.01 139.37'
              style={{ fill: '#fff' }}
            />
          </mask>
        </defs>
      </svg>
      <div className='absolute z-0 h-full w-full' style={{ mask: 'url(#scrollMask)' }}>
        <motion.img
          src='src/assets/hero-bg.png'
          alt='palm tree background'
          className='absolute aspect-auto -top-10'
          style={{ translateY: parallax }}
        />
      </div>
      <img
        src='src/assets/me-cutout.png'
        alt='its me'
        className='absolute left-1/2 w-full -translate-x-1/2 mask-[url(/src/assets/svg/bottom.svg)] mask-exclude mask-luminance mask-contain mask-no-repeat'
      />
    </div>
  )
}
