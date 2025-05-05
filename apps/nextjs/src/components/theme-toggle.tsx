'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@a/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
  const { setTheme, theme, themes } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='*:absolute *:duration-700 *:p-1.5 *:right-0 *:size-8 *:text-muted-foreground *:top-0 *:transition-all focus-visible:ring-0 group hover:*:p-1 relative'>
        <Sun className='dark:-rotate-180 dark:scale-0 rotate-0 scale-100' />
        <Moon className='dark:rotate-0 dark:scale-100 rotate-180 scale-0' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='capitalize duration-300 hover:drop-shadow-xl m-6 transition-all'>
        <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
          {themes.map(t => (
            <DropdownMenuRadioItem key={t} value={t}>
              {t}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
