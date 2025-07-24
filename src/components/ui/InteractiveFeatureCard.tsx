import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

interface InteractiveFeatureCard extends React.ComponentProps<'div'> {
  layoutIdPrefix: string
}

interface Header extends InteractiveFeatureCard {
  expanded: boolean
}

function Content({ children, className, layoutIdPrefix }: InteractiveFeatureCard) {
  return (
    <motion.div layoutId={`${layoutIdPrefix}-image`} className={cn('h-max w-full', className)}>
      {children}
    </motion.div>
  )
}

function Header({ className, layoutIdPrefix, expanded }: Header) {
  return (
    <motion.div
      layoutId={`${layoutIdPrefix}-header`}
      className={cn('absolute top-5 left-5 z-1 flex w-72 flex-col gap-3', className)}>
      <h2
        className={cn(
          'text-accent text-xs font-bold opacity-0 transition-opacity md:opacity-100',
          expanded ? 'opacity-100' : 'opacity-0',
        )}>
        Illustration
      </h2>
      <p
        className={cn(
          'text-accent text-xl font-bold opacity-0 transition-opacity md:opacity-100',
          expanded ? 'opacity-100' : 'opacity-0',
        )}>
        My signature wallpaper, made by yours truly.
      </p>
    </motion.div>
  )
}

function Description({ layoutIdPrefix }: InteractiveFeatureCard) {
  return (
    <motion.p layoutId={`${layoutIdPrefix}-p`} className='bg-slate-900 p-7 text-sm text-gray-300'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cum natus ex in aperiam a eveniet iste, explicabo,
      delectus fugiat numquam nesciunt sunt perferendis doloremque mollitia accusamus. Tempore, earum totam.
    </motion.p>
  )
}

export default function InteractiveFeatureCard({
  className,
  children,
  layoutIdPrefix,
  ...props
}: InteractiveFeatureCard): React.ReactNode {
  const [expanded, setExpanded] = useState(false)
  const [expandedDelay, setExpandedDelay] = useState(expanded)

  useEffect(() => {
    const timeoutRef = { current: null as ReturnType<typeof setTimeout> | null }
    timeoutRef.current = setTimeout(() => {
      setExpandedDelay(expanded)
    }, 150)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [expanded])

  return (
    <Dialog.Root onOpenChange={setExpanded} open={expanded}>
      <Dialog.Trigger asChild>
        <motion.div
          layoutId={`${layoutIdPrefix}-card`}
          className={cn(
            'relative flex h-[var(--interative-feature-card)] lg:h-[var(--interative-feature-card-lg)] w-[min(100%,90vw)] flex-col items-center overflow-hidden rounded-xl',
            expandedDelay ? 'z-11' : 'z-1',
            className,
          )}>
          <motion.div
            layoutId={`${layoutIdPrefix}-mask`}
            className='absolute top-0 left-0 flex h-[var(--interative-feature-card)] lg:h-[var(--interative-feature-card-lg)] w-full flex-row items-center overflow-hidden'>
            <Header layoutIdPrefix={layoutIdPrefix} expanded={expanded} />
            <div className='transition-all duration-200 hover:scale-101'>
              <Content layoutIdPrefix={layoutIdPrefix}>{children}</Content>
            </div>
          </motion.div>
          <div className='relative top-[100%] w-[min(45rem,90vw)] self-center'>
            <Description layoutIdPrefix={layoutIdPrefix} />
          </div>
        </motion.div>
      </Dialog.Trigger>
      <Dialog.DialogOverlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-10 bg-black/30 backdrop-blur-md duration-200' />
      <Dialog.Content asChild>
        <motion.div
          layoutId={`${layoutIdPrefix}-card`}
          className='fixed top-1/2 left-1/2 z-11 flex h-auto w-[min(45rem,90vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl outline-0'>
          <div className='h-[var(--interative-feature-card)] md:h-[var(--interative-feature-card-lg)] '>
            <motion.div
              layoutId={`${layoutIdPrefix}-mask`}
              className='absolute top-0 left-0 z-1 flex w-full flex-row items-start overflow-hidden h-[var(--interative-feature-card)] md:h-[var(--interative-feature-card-lg)] '>
              <Header layoutIdPrefix={layoutIdPrefix} expanded={expanded} />
              <Content layoutIdPrefix={layoutIdPrefix}>{children}</Content>
            </motion.div>
          </div>
          <div className='w-[min(45rem,90vw)]'>
            <Description layoutIdPrefix={layoutIdPrefix} />
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
