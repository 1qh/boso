'use client'

import { cn } from '@a/ui'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as React from 'react'

const Switch = ({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) => (
  <SwitchPrimitive.Root
    className={cn(
      'border border-transparent dark:data-[state=unchecked]:bg-input/80 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 h-[1.15rem] inline-flex items-center outline-none peer rounded-full shadow-xs shrink-0 transition-all w-8',
      className
    )}
    data-slot='switch'
    {...props}>
    <SwitchPrimitive.Thumb
      className={cn(
        'bg-background block dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 pointer-events-none ring-0 rounded-full size-4 transition-transform'
      )}
      data-slot='switch-thumb'
    />
  </SwitchPrimitive.Root>
)

export { Switch }
