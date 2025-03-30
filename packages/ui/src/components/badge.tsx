import type { VariantProps } from 'class-variance-authority'

import { cn } from '@a/ui'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const badgeVariants = cva(
    '[&>svg]:pointer-events-none [&>svg]:size-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20 border dark:aria-invalid:ring-destructive/40 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-medium gap-1 inline-flex items-center justify-center overflow-hidden px-2 py-0.5 rounded-md shrink-0 text-xs transition-[color,box-shadow] w-fit whitespace-nowrap',
    {
      defaultVariants: {
        variant: 'default'
      },
      variants: {
        variant: {
          default: '[a&]:hover:bg-primary/90 bg-primary border-transparent text-primary-foreground',
          destructive:
            '[a&]:hover:bg-destructive/90 bg-destructive border-transparent dark:bg-destructive/70 dark:focus-visible:ring-destructive/40 focus-visible:ring-destructive/20 text-white',
          outline: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground text-foreground',
          secondary: '[a&]:hover:bg-secondary/90 bg-secondary border-transparent text-secondary-foreground'
        }
      }
    }
  ),
  Badge = ({
    asChild = false,
    className,
    variant,
    ...props
  }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : 'span'
    return <Comp className={cn(badgeVariants({ variant }), className)} data-slot='badge' {...props} />
  }

export { Badge, badgeVariants }
