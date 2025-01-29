'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@a/ui/dropdown-menu'

const ThemeToggle = () => {
  const { setTheme, theme, themes } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='group relative *:absolute *:right-0 *:top-0 *:size-8 *:p-1.5 *:text-muted-foreground *:transition-all *:duration-700 hover:*:p-1 focus-visible:ring-0'>
        <Sun className='rotate-0 scale-100 dark:-rotate-180 dark:scale-0' />
        <Moon className='rotate-180 scale-0 dark:rotate-0 dark:scale-100' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='m-6 capitalize transition-all duration-300 hover:drop-shadow-xl'>
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
