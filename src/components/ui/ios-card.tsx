import { Children, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'


function Content({ children, className }: React.ComponentProps<'div'>) {
  return (
    <motion.div layoutId='ios-image' className={cn('h-auto w-full', className)}>
      {children}
    </motion.div>
  )
}

function Header() {
  return (
    <motion.div layoutId='ios-header' className='absolute top-5 left-5 z-1 flex w-72 flex-col gap-3'>
      <h2 className='text-accent text-xs font-bold'>Illustration</h2>
      <p className='text-accent text-xl font-bold'>My signature wallpaper, made by yours truly.</p>
    </motion.div>
  )
}

function Description() {
  return (
    <motion.p layoutId='ios-p' className='bg-slate-900 p-7 text-sm text-gray-300'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cum natus ex in aperiam a eveniet iste, explicabo,
      delectus fugiat numquam nesciunt sunt perferendis doloremque mollitia accusamus. Tempore, earum totam.
    </motion.p>
  )
}

export default function CardIOS({ className, children, ...props }: React.ComponentProps<'div'>): React.ReactNode {
  const [expanded, setExpanded] = useState(false)

  return (
    <Dialog.Root onOpenChange={setExpanded} open={expanded}>
      <Dialog.Trigger asChild>
        <motion.div
          layoutId='ios-card'
          className='relative z-50 flex h-[20rem] w-[min(30rem,90vw)] flex-col items-center overflow-hidden rounded-xl'>
          <motion.div
            layoutId='ios-mask'
            className='absolute top-0 left-0 flex h-[25rem] w-full flex-row items-center overflow-hidden'>
            <Header />
            <Content>{children}</Content>
          </motion.div>

          <div className='relative top-[100%] w-[min(45rem,90vw)] self-center'>
            <Description />
          </div>
        </motion.div>
      </Dialog.Trigger>
      <Dialog.DialogOverlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-49 bg-black/30 backdrop-blur-md duration-300' />
      <Dialog.Content asChild>
        <motion.div
          layoutId='ios-card'
          className='fixed top-1/2 left-1/2 z-50 flex h-auto w-[min(45rem,90vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl outline-0'>
          <div className='h-[25rem]'>
            <motion.div
              layoutId='ios-mask'
              className='absolute top-0 left-0 z-1 flex h-[25rem] w-full flex-row items-start overflow-hidden'>
              <Header />
              <Content>{children}</Content>
            </motion.div>
          </div>
          <div className='w-[min(45rem,90vw)]'>
            <Description />
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
