'use client'

import { cn } from '@a/ui'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

const Progress = ({ className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) => (
  <ProgressPrimitive.Root
    className={cn('bg-primary/20 h-2 overflow-hidden relative rounded-full w-full', className)}
    data-slot='progress'
    {...props}>
    <ProgressPrimitive.Indicator
      className='bg-primary flex-1 h-full transition-all w-full'
      data-slot='progress-indicator'
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
)

export { Progress }
