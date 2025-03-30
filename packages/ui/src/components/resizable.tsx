'use client'

import { cn } from '@a/ui'
import { GripVerticalIcon } from 'lucide-react'
import * as React from 'react'
import * as ResizablePrimitive from 'react-resizable-panels'

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
    <ResizablePrimitive.PanelGroup
      className={cn('data-[panel-group-direction=vertical]:flex-col flex h-full w-full', className)}
      data-slot='resizable-panel-group'
      {...props}
    />
  ),
  ResizablePanel = ({ ...props }: React.ComponentProps<typeof ResizablePrimitive.Panel>) => (
    <ResizablePrimitive.Panel data-slot='resizable-panel' {...props} />
  ),
  ResizableHandle = ({
    className,
    withHandle,
    ...props
  }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean
  }) => (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        '[&[data-panel-group-direction=vertical]>div]:rotate-90 after:-translate-x-1/2 after:absolute after:inset-y-0 after:left-1/2 after:w-1 bg-border data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full flex focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-ring items-center justify-center relative w-px',
        className
      )}
      data-slot='resizable-handle'
      {...props}>
      {withHandle ? (
        <div className='bg-border border flex h-4 items-center justify-center rounded-xs w-3 z-10'>
          <GripVerticalIcon className='size-2.5' />
        </div>
      ) : null}
    </ResizablePrimitive.PanelResizeHandle>
  )

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
