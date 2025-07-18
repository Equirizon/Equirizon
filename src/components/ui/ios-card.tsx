import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface CardIOS extends React.ComponentProps<'div'> {
  orientation: 'portrait' | 'landscape'
}

function Content({ orientation }: CardIOS) {
  return (
    <motion.div layoutId='ios-image' className={cn(orientation === 'portrait' ? 'h-auto w-full' : 'h-full w-auto')}>
      <motion.div layoutId='ios-card-header' className='absolute top-5 left-5 flex w-72 flex-col gap-3'>
        <h2 className='text-accent text-xs font-bold'>Illustration</h2>
        <p className='text-accent text-xl font-bold'>My signature wallpaper, made by yours truly.</p>
      </motion.div>
      <img
        className={cn('aspect-auto', orientation === 'portrait' ? 'w-full' : 'h-full')}
        src='./src/images/cover-art.png'
        alt='Equirizon'
      />
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

export default function CardIOS({ className, orientation = 'portrait', ...props }: CardIOS): React.ReactNode {
  const [expanded, setExpanded] = useState(false)

  return (
    <Dialog.Root onOpenChange={setExpanded} open={expanded}>
      <Dialog.Trigger asChild>
        <motion.div
          layoutId='ios-card'
          className={cn(
            'relative z-50 flex h-[20rem] w-[min(30rem,90vw)] flex-col overflow-hidden rounded-xl',
            orientation === 'portrait' ? 'items-center' : 'items-start',
          )}>
          {orientation === 'portrait' ? (
            <motion.div layoutId='ios-mask' className='absolute top-0 left-0 h-[20rem] w-full overflow-hidden'>
              <Content orientation={orientation} />
            </motion.div>
          ) : (
            <div className='h-full w-max'>
              <Content orientation={orientation} />
            </div>
          )}
          <div className='absolute bottom-0 -z-1 w-[min(45rem,90vw)] self-center'>
            <Description />
          </div>
        </motion.div>
      </Dialog.Trigger>
      <Dialog.DialogOverlay className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-49 bg-black/30 backdrop-blur-md duration-300' />
      <Dialog.Content asChild>
        <motion.div
          layoutId='ios-card'
          className='fixed top-1/2 left-1/2 z-50 flex h-auto w-[min(45rem,90vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl outline-0'>
          <div className={cn(orientation === 'portrait' ? 'h-[20rem]' : 'w-[min(45rem,90vw)]')}>
            <motion.div layoutId='ios-mask' className='absolute top-0 left-0 h-[20rem] w-full overflow-hidden z-1'>
              <Content orientation={orientation} />
            </motion.div>
          </div>
          <div className='w-[min(45rem,90vw)] self-center'>
            <Description />
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
