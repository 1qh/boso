'use client'

import { cn } from '@a/ui'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import * as React from 'react'

const Checkbox = ({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => (
  <CheckboxPrimitive.Root
    className={cn(
      'aria-invalid:border-destructive aria-invalid:ring-destructive/20 border border-input dark:aria-invalid:ring-destructive/40 dark:bg-input/30 dark:data-[state=checked]:bg-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none peer rounded-[4px] shadow-xs shrink-0 size-4 transition-shadow',
      className
    )}
    data-slot='checkbox'
    {...props}>
    <CheckboxPrimitive.Indicator
      className='flex items-center justify-center text-current transition-none'
      data-slot='checkbox-indicator'>
      <CheckIcon className='size-3.5' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

export { Checkbox }
