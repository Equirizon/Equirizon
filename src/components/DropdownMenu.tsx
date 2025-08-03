import {
  DropdownMenu as DropdownMenuProvider,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Check,
  ChevronUp,
  CircleUserRound,
  EllipsisVertical,
  Heart,
  Info,
  MonitorCog,
  Moon,
  PanelsTopLeft,
  Sun,
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function DropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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
    <DropdownMenuProvider open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        {isDropdownOpen ? (
          <ChevronUp className='animate-in fade-in-0 zoom-in-80 focus:spin-in w-10 lg:hidden' />
        ) : (
          <EllipsisVertical className='animate-in fade-in-0 zoom-in-80 w-10 lg:hidden' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='dark:bg-theme-secondary-accent/70 bg-theme-primary-accent/80 text-muted-foreground mx-2 mt-2 backdrop-blur-xl'>
        <DropdownMenuLabel>
          <a href='#hero'>Equirizon</a>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a href='#about'>
            <Info className='hover:text-accent-foreground' />
            About
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href='#projects'>
            <PanelsTopLeft className='hover:text-accent-foreground' />
            Projects
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href='#passions'>
            <Heart className='hover:text-accent-foreground' />
            Hobbies
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href='#contact'>
            <CircleUserRound className='hover:text-accent-foreground' />
            Contact
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setThemeState('theme-light')}>
          <Sun className='hover:text-accent-foreground' /> Light{' '}
          {theme === 'theme-light' ? <Check size={15} className='ml-auto' /> : ''}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState('dark')}>
          <Moon className='hover:text-accent-foreground' /> Dark{' '}
          {theme === 'dark' ? <Check size={15} className='ml-auto' /> : ''}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeState('system')}>
          <MonitorCog className='hover:text-accent-foreground' /> System{' '}
          {theme === 'system' ? <Check size={15} className='ml-auto' /> : ''}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className='flex flex-row items-center justify-between gap-1'>
          <DropdownMenuItem>
            <a
              href='https://github.com/Equirizon'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-accent-foreground transition-all'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='block h-7'>
                <title>GitHub</title>
                <path
                  d='M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'></path>
              </svg>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href='https://linkedin.com/in/donbustria/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-typescript transition-all'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='block h-7'>
                <title>Hire me!</title>
                <path
                  d='M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'></path>
              </svg>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href='https://soundcloud.com/equirizon'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-soundcloud transition-all'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'>
                <title>SoundCloud</title>
                <path
                  fill='currentColor'
                  d='M10.464 8.596c.265 0 .48 2.106.48 4.704l-.001.351c-.019 2.434-.226 4.353-.479 4.353c-.256 0-.465-1.965-.48-4.44v-.352c.005-2.557.218-4.616.48-4.616m-1.664.96c.259 0 .47 1.8.48 4.054v.34c-.01 2.254-.221 4.054-.48 4.054c-.255 0-.464-1.755-.48-3.97v-.34l.002-.34c.025-2.133.23-3.798.478-3.798m-1.664 0c.255 0 .464 1.755.48 3.97v.34l-.002.34c-.025 2.133-.23 3.798-.478 3.798c-.259 0-.47-1.8-.48-4.054v-.34c.01-2.254.221-4.054.48-4.054m-1.664.576c.265 0 .48 1.762.48 3.936l-.002.335c-.02 2.017-.227 3.601-.478 3.601c-.262 0-.474-1.717-.48-3.852v-.168c.006-2.135.218-3.852.48-3.852M3.808 11.86c.265 0 .48 1.375.48 3.072v.158c-.013 1.623-.223 2.914-.48 2.914c-.265 0-.48-1.375-.48-3.072v-.158c.013-1.623.223-2.914.48-2.914m10.784-4.8c2.58 0 4.72 1.886 5.118 4.355q.444-.129.93-.13a3.36 3.36 0 0 1 .063 6.718l-.063.001h-8.16a.77.77 0 0 1-.768-.768V7.933a5.16 5.16 0 0 1 2.88-.873M2.144 11.668c.265 0 .48 1.333.48 2.976v.156c-.014 1.57-.223 2.82-.48 2.82c-.26 0-.473-1.29-.48-2.898v-.078c0-1.643.215-2.976.48-2.976m-1.664.96c.265 0 .48.946.48 2.112v.131c-.016 1.105-.225 1.981-.48 1.981c-.265 0-.48-.946-.48-2.112v-.131c.016-1.105.225-1.98.48-1.98'></path>
              </svg>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              href='https://www.instagram.com/equirizon/'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-all hover:text-pink-400'>
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='block h-7'>
                <title>Instagram</title>
                <path
                  d='M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'></path>
              </svg>
            </a>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenuProvider>
  )
}
