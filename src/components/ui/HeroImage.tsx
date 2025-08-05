'use client'

import type { GetImageResult } from 'astro'
import { useScroll, useMotionValueEvent, motion } from 'motion/react'
import React, { useState } from 'react'
import maskBottom from '@/assets/SVG/bottom.svg'

interface HeroImage {
  heroImage: GetImageResult
  parallaxBackground: GetImageResult
}

export default function HeroImage({ heroImage, parallaxBackground }: HeroImage): React.ReactNode {
  const { scrollYProgress } = useScroll()
  const [parallax, setParallax] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setParallax(value * 400)
  })

  return (
    <div className='relative aspect-square w-sm overflow-clip xl:w-lg'>
      <svg
        className='pointer-events-none absolute top-0 left-0 z-10 h-full w-full'
        viewBox='0 0 512 512'
        preserveAspectRatio='xMidYMid meet'>
        <defs>
          <mask id='scrollMask' maskUnits='userSpaceOnUse' x='0' y='0' width='512' height='512'>
            <g className='scale-[0.75] xl:scale-100'>
              <rect width='512' height='512' />
              <polygon
                points='458.01 139.37 458.01 372.63 256 489.26 53.99 372.63 53.99 139.37 256 22.74 458.01 139.37'
                style={{ fill: '#fff' }}
              />
            </g>
          </mask>
        </defs>
      </svg>
      <div className='absolute z-0 h-full w-full' style={{ mask: 'url(#scrollMask)' }}>
        <motion.img
          fetchPriority='high'
          src={parallaxBackground.src}
          alt='palm tree background'
          className='absolute -top-10 aspect-auto'
          style={{ translateY: parallax }}
        />
      </div>
      <img
        fetchPriority='high'
        src={heroImage.src}
        alt='its me'
        style={{ maskImage: `url(${maskBottom.src})` }}
        className='absolute left-1/2 w-full -translate-x-1/2 mask-exclude mask-luminance mask-contain mask-no-repeat'
      />
    </div>
  )
}
