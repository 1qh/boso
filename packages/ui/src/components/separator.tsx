'use client'

import { cn } from '@a/ui'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as React from 'react'

const Separator = ({
  className,
  decorative = true,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    className={cn(
      'bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px shrink-0',
      className
    )}
    data-slot='separator-root'
    decorative={decorative}
    orientation={orientation}
    {...props}
  />
)

export { Separator }
