import { Check, MonitorCog, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setThemeState] = useState<'theme-light' | 'dark' | 'system'>('theme-light')

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setThemeState(isDarkMode ? 'dark' : 'theme-light')
  }, [])

  useEffect(() => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-popover/70 text-muted-foreground backdrop-blur-lg' align='end'>
        <DropdownMenuItem onClick={() => setThemeState('theme-light')}>
          <Sun /> Light {theme === 'theme-light' ? <Check size={15} className='ml-auto' /> : ''}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState('dark')}>
          <Moon /> Dark {theme === 'dark' ? <Check size={15} className='ml-auto' /> : ''}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState('system')}>
          <MonitorCog /> System {theme === 'system' ? <Check size={15} className='ml-auto' /> : ''}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
