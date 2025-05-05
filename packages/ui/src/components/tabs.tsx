'use client'

import { cn } from '@a/ui'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

const Tabs = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) => (
    <TabsPrimitive.Root className={cn('flex flex-col gap-2', className)} data-slot='tabs' {...props} />
  ),
  TabsList = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) => (
    <TabsPrimitive.List
      className={cn(
        'bg-muted h-9 inline-flex items-center justify-center p-[3px] rounded-lg text-muted-foreground w-fit',
        className
      )}
      data-slot='tabs-list'
      {...props}
    />
  ),
  TabsTrigger = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) => (
    <TabsPrimitive.Trigger
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 border border-transparent dark:data-[state=active]:bg-input/30 dark:data-[state=active]:border-input dark:data-[state=active]:text-foreground dark:text-muted-foreground data-[state=active]:bg-background data-[state=active]:shadow-sm disabled:opacity-50 disabled:pointer-events-none flex-1 focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-medium gap-1.5 h-[calc(100%-1px)] inline-flex items-center justify-center px-2 py-1 rounded-md text-foreground text-sm transition-[color,box-shadow] whitespace-nowrap",
        className
      )}
      data-slot='tabs-trigger'
      {...props}
    />
  ),
  TabsContent = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) => (
    <TabsPrimitive.Content className={cn('flex-1 outline-none', className)} data-slot='tabs-content' {...props} />
  )

export { Tabs, TabsContent, TabsList, TabsTrigger }
