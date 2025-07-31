import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface InteractiveFeatureCard extends React.ComponentProps<'div'> {
  textContent: {
    category: string
    title: string
    description: string
  }
  aspectRatio: '16/9' | '9/16' | '4/3' | '3/4' | 'square'
}

interface TextContents extends React.ComponentProps<'div'> {
  textContent: {
    category: string
    title: string
    description: string
  }
  layoutIdPrefix: string
  expanded?: boolean
}

interface Content extends TextContents {
  aspectRatio: '16/9' | '9/16' | '4/3' | '3/4' | 'square'
}

function Content({ children, layoutIdPrefix, aspectRatio }: Content) {
  return (
    <motion.div
      layoutId={`${layoutIdPrefix}-image`}
      className={cn(
        'h-max w-full',
        aspectRatio === '16/9'
          ? 'min-w-[calc(var(--interactive-feature-card)*(16/9))] lg:min-w-[calc(var(--interactive-feature-card-lg)*(16/9))]'
          : aspectRatio === '9/16'
            ? 'min-w-[calc(var(--interactive-feature-card)*(9/16))] lg:min-w-[calc(var(--interactive-feature-card-lg)*(9/16))]'
            : aspectRatio === '4/3'
              ? 'min-w-[calc(var(--interactive-feature-card)*(4/3))] lg:min-w-[calc(var(--interactive-feature-card-lg)*(4/3))]'
              : aspectRatio === '3/4'
                ? 'min-w-[calc(var(--interactive-feature-card)*(3/4))] lg:min-w-[calc(var(--interactive-feature-card-lg)*(3/4))]'
                : 'min-w-[var(--interactive-feature-card)] lg:min-w-[var(--interactive-feature-card-lg)]',
      )}>
      {children}
    </motion.div>
  )
}

function Header({ className, layoutIdPrefix, expanded, textContent }: TextContents) {
  return (
    <motion.div
      layoutId={`${layoutIdPrefix}-header`}
      className={cn(
        'absolute z-1 flex w-72 flex-col gap-2',
        expanded ? 'top-5 left-5 lg:top-7 lg:left-7' : 'top-4 left-4',
        className,
      )}>
      <h2
        className={cn(
          'text-xs font-semibold text-pink-50 opacity-0 transition-opacity lg:opacity-100',
          expanded ? 'opacity-100' : 'opacity-0',
        )}>
        {textContent.category}
      </h2>
      <p
        className={cn(
          'text-xl font-semibold text-balance text-pink-50 opacity-0 tracking-tight transition-opacity lg:opacity-100',
          expanded ? 'opacity-100' : 'opacity-0',
        )}>
        {textContent.title}
      </p>
    </motion.div>
  )
}

function Description({ layoutIdPrefix, textContent }: TextContents) {
  return (
    <motion.p
      layoutId={`${layoutIdPrefix}-p`}
      className='dark:to-fuchsia-950 dark:from-gray-900 dark:bg-linear-20 bg-slate-900 from-50% to-200% md:p-7 p-6 md:text-base/snug text-sm/snug whitespace-pre-line text-slate-400'>
      {textContent.description}
    </motion.p>
  )
}

export default function InteractiveFeatureCard({
  className,
  children,
  textContent,
  aspectRatio = 'square',
}: InteractiveFeatureCard): React.ReactNode {
  const [expanded, setExpanded] = useState(false)
  const [expandedDelay, setExpandedDelay] = useState(expanded)
  const [layoutIdPrefix] = useState(Math.random().toString())

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
            'relative flex h-[var(--interactive-feature-card)] w-[min(max-content,100%)] flex-col items-center overflow-hidden rounded-2xl lg:h-[var(--interactive-feature-card-lg)]',
            expandedDelay ? 'z-11' : 'z-1',
            className,
          )}>
          <motion.div
            layoutId={`${layoutIdPrefix}-mask`}
            className='absolute top-0 left-0 flex h-[var(--interactive-feature-card)] w-full flex-row items-center overflow-hidden lg:h-[var(--interactive-feature-card-lg)]'>
            <Header textContent={textContent} layoutIdPrefix={layoutIdPrefix} expanded={expanded} />
            <div className='flex w-full flex-col items-center justify-center transition-all duration-200 hover:scale-101'>
              <Content textContent={textContent} layoutIdPrefix={layoutIdPrefix} aspectRatio={aspectRatio}>
                {children}
              </Content>
            </div>
          </motion.div>
          <div className='relative top-[100%] w-[min(45rem,90vw)] self-center'>
            <Description textContent={textContent} layoutIdPrefix={layoutIdPrefix} />
          </div>
        </motion.div>
      </Dialog.Trigger>
      <Dialog.DialogOverlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-10 bg-black/40 backdrop-blur-sm duration-300' />
      <Dialog.Content asChild>
        <motion.div
          layoutId={`${layoutIdPrefix}-card`}
          className='fixed top-1/2 left-1/2 z-11 flex h-auto w-[min(45rem,90vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl outline-0'>
          <div className='h-[var(--interactive-feature-card)] md:h-[var(--interactive-feature-card-lg)]'>
            <motion.div
              layoutId={`${layoutIdPrefix}-mask`}
              className='absolute top-0 left-0 z-1 flex h-[var(--interactive-feature-card)] w-full flex-row items-start overflow-hidden md:h-[var(--interactive-feature-card-lg)]'>
              <Header textContent={textContent} layoutIdPrefix={layoutIdPrefix} expanded={expanded} />
              <Content textContent={textContent} layoutIdPrefix={layoutIdPrefix} aspectRatio={aspectRatio}>
                {children}
              </Content>
            </motion.div>
          </div>
          <div className='w-[min(45rem,90vw)]'>
            <Description textContent={textContent} layoutIdPrefix={layoutIdPrefix} />
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
