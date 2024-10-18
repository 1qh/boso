'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { Button } from '@a/ui/button'
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
      <DropdownMenuTrigger asChild>
        <Button
          className='group size-9 transition-all duration-300 *:ml-px *:size-7 *:text-muted-foreground *:transition-all *:duration-1000 hover:scale-110 hover:drop-shadow-lg *:hover:text-foreground focus-visible:ring-0'
          size='icon'
          variant='ghost'>
          <SunIcon className='rotate-0 scale-100 group-hover:rotate-180 dark:-rotate-180 dark:scale-0' />

          <MoonIcon className='absolute rotate-180 scale-0 group-hover:rotate-180 dark:rotate-0 dark:scale-100' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='mx-2 my-1 capitalize transition-all duration-300 hover:drop-shadow-xl'>
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
