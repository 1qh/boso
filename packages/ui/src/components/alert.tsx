import type { VariantProps } from 'class-variance-authority'

import { cn } from '@a/ui'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const alertVariants = cva(
    '[&>svg]:size-4 [&>svg]:text-current [&>svg]:translate-y-0.5 border gap-y-0.5 grid grid-cols-[0_1fr] has-[>svg]:gap-x-3 has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] items-start px-4 py-3 relative rounded-lg text-sm w-full',
    {
      defaultVariants: {
        variant: 'default'
      },
      variants: {
        variant: {
          default: 'bg-card text-card-foreground',
          destructive: '[&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90 bg-card text-destructive'
        }
      }
    }
  ),
  Alert = ({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) => (
    <div className={cn(alertVariants({ variant }), className)} data-slot='alert' role='alert' {...props} />
  ),
  AlertTitle = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('col-start-2 font-medium line-clamp-1 min-h-4 tracking-tight', className)}
      data-slot='alert-title'
      {...props}
    />
  ),
  AlertDescription = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn(
        '[&_p]:leading-relaxed col-start-2 gap-1 grid justify-items-start text-muted-foreground text-sm',
        className
      )}
      data-slot='alert-description'
      {...props}
    />
  )

export { Alert, AlertDescription, AlertTitle }
