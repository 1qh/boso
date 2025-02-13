'use client'

import * as React from 'react'
import { HoverCard as HoverCardPrimitive } from 'radix-ui'

import { cn } from '@a/ui'

const HoverCard = HoverCardPrimitive.Root,
  HoverCardTrigger = HoverCardPrimitive.Trigger,
  HoverCardContent = React.forwardRef<
    React.ComponentRef<typeof HoverCardPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
  >(({ align = 'center', className, sideOffset = 4, ...props }, ref) => (
    <HoverCardPrimitive.Content
      align={align}
      className={cn(
        'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  ))

export { HoverCard, HoverCardContent, HoverCardTrigger }
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName
