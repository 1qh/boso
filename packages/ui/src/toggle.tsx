'use client'

import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva } from 'class-variance-authority'

import { cn } from '@a/ui'

const toggleVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
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
          outline:
            'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground'
        }
      }
    }
  ),
  Toggle = React.forwardRef<
    React.ComponentRef<typeof TogglePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
      VariantProps<typeof toggleVariants>
  >(({ className, size, variant, ...props }, ref) => (
    <TogglePrimitive.Root
      className={cn(toggleVariants({ className, size, variant }))}
      ref={ref}
      {...props}
    />
  ))

export { Toggle, toggleVariants }
Toggle.displayName = TogglePrimitive.Root.displayName