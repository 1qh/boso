'use client'

import { cn } from '@a/ui'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import * as React from 'react'

const ScrollBar = ({
    className,
    orientation = 'vertical',
    ...props
  }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      className={cn(
        'flex p-px select-none touch-none transition-colors',
        orientation === 'vertical' && 'border-l border-l-transparent h-full w-2.5',
        orientation === 'horizontal' && 'border-t border-t-transparent flex-col h-2.5',
        className
      )}
      data-slot='scroll-area-scrollbar'
      orientation={orientation}
      {...props}>
      <ScrollAreaPrimitive.ScrollAreaThumb
        className='bg-border flex-1 relative rounded-full'
        data-slot='scroll-area-thumb'
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
  ScrollArea = ({ children, className, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) => (
    <ScrollAreaPrimitive.Root className={cn('relative', className)} data-slot='scroll-area' {...props}>
      <ScrollAreaPrimitive.Viewport
        className='dark:outline-ring/40 dark:ring-ring/20 focus-visible:outline-1 focus-visible:ring-4 outline-ring/50 ring-ring/10 rounded-[inherit] size-full transition-[color,box-shadow]'
        data-slot='scroll-area-viewport'>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )

export { ScrollArea, ScrollBar }
