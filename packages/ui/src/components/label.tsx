'use client'

import { cn } from '@a/ui'
import * as LabelPrimitive from '@radix-ui/react-label'
import * as React from 'react'

const Label = ({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root
    className={cn(
      'flex font-medium gap-2 group-data-[disabled=true]:opacity-50 group-data-[disabled=true]:pointer-events-none items-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 select-none text-sm',
      className
    )}
    data-slot='label'
    {...props}
  />
)

export { Label }
