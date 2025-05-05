'use client'

import { cn } from '@a/ui'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'

const TooltipProvider = ({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) => (
    <TooltipPrimitive.Provider data-slot='tooltip-provider' delayDuration={delayDuration} {...props} />
  ),
  Tooltip = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) => (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  ),
  TooltipTrigger = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) => (
    <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
  ),
  TooltipContent = ({
    children,
    className,
    sideOffset = 0,
    ...props
  }: React.ComponentProps<typeof TooltipPrimitive.Content>) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(
          'animate-in bg-primary data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 fade-in-0 origin-(--radix-tooltip-content-transform-origin) px-3 py-1.5 rounded-md text-balance text-primary-foreground text-xs w-fit z-50 zoom-in-95',
          className
        )}
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        {...props}>
        {children}
        <TooltipPrimitive.Arrow className='bg-primary fill-primary rotate-45 rounded-[2px] size-2.5 translate-y-[calc(-50%_-_2px)] z-50' />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
