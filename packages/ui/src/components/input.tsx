import { cn } from '@a/ui'
import * as React from 'react'

const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => (
  <input
    className={cn(
      'bg-transparent border border-input dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none file:bg-transparent file:border-0 file:font-medium file:h-7 file:inline-flex file:text-foreground file:text-sm flex h-9 md:text-sm min-w-0 outline-none placeholder:text-muted-foreground px-3 py-1 rounded-md selection:bg-primary selection:text-primary-foreground shadow-xs text-base transition-[color,box-shadow] w-full',
      'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
      className
    )}
    data-slot='input'
    type={type}
    {...props}
  />
)

export { Input }
