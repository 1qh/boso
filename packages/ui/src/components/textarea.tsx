import { cn } from '@a/ui'
import * as React from 'react'

const Textarea = ({ className, ...props }: React.ComponentProps<'textarea'>) => (
  <textarea
    className={cn(
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20 bg-transparent border border-input dark:aria-invalid:ring-destructive/40 dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50 field-sizing-content flex focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm min-h-16 outline-none placeholder:text-muted-foreground px-3 py-2 rounded-md shadow-xs text-base transition-[color,box-shadow] w-full',
      className
    )}
    data-slot='textarea'
    {...props}
  />
)

export { Textarea }
