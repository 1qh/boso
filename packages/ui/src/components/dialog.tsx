'use client'

import { cn } from '@a/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'

const Dialog = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) => (
    <DialogPrimitive.Root data-slot='dialog' {...props} />
  ),
  DialogTrigger = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) => (
    <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
  ),
  DialogPortal = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) => (
    <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
  ),
  DialogClose = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) => (
    <DialogPrimitive.Close data-slot='dialog-close' {...props} />
  ),
  DialogOverlay = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
    <DialogPrimitive.Overlay
      className={cn(
        'bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50',
        className
      )}
      data-slot='dialog-overlay'
      {...props}
    />
  ),
  DialogContent = ({ children, className, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) => (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'bg-background border data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-200 fixed gap-4 grid left-[50%] max-w-[calc(100%-2rem)] p-6 rounded-lg shadow-lg sm:max-w-lg top-[50%] translate-x-[-50%] translate-y-[-50%] w-full z-50',
          className
        )}
        data-slot='dialog-content'
        {...props}>
        {children}
        <DialogPrimitive.Close className="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 absolute data-[state=open]:bg-accent data-[state=open]:text-muted-foreground disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-ring hover:opacity-100 opacity-70 right-4 ring-offset-background rounded-xs top-4 transition-opacity">
          <XIcon />
          <span className='sr-only'>Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
  DialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex flex-col gap-2 sm:text-left text-center', className)} data-slot='dialog-header' {...props} />
  ),
  DialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      data-slot='dialog-footer'
      {...props}
    />
  ),
  DialogTitle = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) => (
    <DialogPrimitive.Title
      className={cn('font-semibold leading-none text-lg', className)}
      data-slot='dialog-title'
      {...props}
    />
  ),
  DialogDescription = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) => (
    <DialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='dialog-description'
      {...props}
    />
  )

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}
