'use client'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '@a/ui'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const toggleVariants = cva(
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-medium gap-2 hover:bg-muted hover:text-muted-foreground inline-flex items-center justify-center outline-none rounded-md text-sm transition-[color,box-shadow] whitespace-nowrap",
    {
      defaultVariants: {
        size: 'default',
        variant: 'default'
      },
      variants: {
        size: {
          default: 'h-9 min-w-9 px-2',
          lg: 'h-10 min-w-10 px-2.5',
          sm: 'h-8 min-w-8 px-1.5'
        },
        variant: {
          default: 'bg-transparent',
          outline: 'bg-transparent border border-input hover:bg-accent hover:text-accent-foreground shadow-xs'
        }
      }
    }
  ),
  Toggle = ({
    className,
    size,
    variant,
    ...props
  }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) => (
    <TogglePrimitive.Root className={cn(toggleVariants({ className, size, variant }))} data-slot='toggle' {...props} />
  )

export { Toggle, toggleVariants }
