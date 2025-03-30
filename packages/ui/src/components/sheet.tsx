'use client'

import { cn } from '@a/ui'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'

const Sheet = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) => (
    <SheetPrimitive.Root data-slot='sheet' {...props} />
  ),
  SheetTrigger = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) => (
    <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
  ),
  SheetClose = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) => (
    <SheetPrimitive.Close data-slot='sheet-close' {...props} />
  ),
  SheetPortal = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) => (
    <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />
  ),
  SheetOverlay = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) => (
    <SheetPrimitive.Overlay
      className={cn(
        'bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50',
        className
      )}
      data-slot='sheet-overlay'
      {...props}
    />
  ),
  SheetContent = ({
    children,
    className,
    side = 'right',
    ...props
  }: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: 'bottom' | 'left' | 'right' | 'top'
  }) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(
          'bg-background data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500 ease-in-out fixed flex flex-col gap-4 shadow-lg transition z-50',
          side === 'right' &&
            'border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right h-full inset-y-0 right-0 sm:max-w-sm w-3/4',
          side === 'left' &&
            'border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left h-full inset-y-0 left-0 sm:max-w-sm w-3/4',
          side === 'top' &&
            'border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top h-auto inset-x-0 top-0',
          side === 'bottom' &&
            'border-t bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom h-auto inset-x-0',
          className
        )}
        data-slot='sheet-content'
        {...props}>
        {children}
        <SheetPrimitive.Close className='absolute data-[state=open]:bg-secondary disabled:pointer-events-none focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-ring hover:opacity-100 opacity-70 right-4 ring-offset-background rounded-xs top-4 transition-opacity'>
          <XIcon className='size-4' />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
  SheetHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex flex-col gap-1.5 p-4', className)} data-slot='sheet-header' {...props} />
  ),
  SheetFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex flex-col gap-2 mt-auto p-4', className)} data-slot='sheet-footer' {...props} />
  ),
  SheetTitle = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) => (
    <SheetPrimitive.Title className={cn('font-semibold text-foreground', className)} data-slot='sheet-title' {...props} />
  ),
  SheetDescription = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) => (
    <SheetPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='sheet-description'
      {...props}
    />
  )

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger }
