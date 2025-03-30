'use client'

import { cn } from '@a/ui'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@a/ui/dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import * as React from 'react'

const Command = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) => (
    <CommandPrimitive
      className={cn(
        'bg-popover flex flex-col h-full overflow-hidden rounded-md text-popover-foreground w-full',
        className
      )}
      data-slot='command'
      {...props}
    />
  ),
  CommandDialog = ({
    children,
    description = 'Search for a command to run...',
    title = 'Command Palette',
    ...props
  }: React.ComponentProps<typeof Dialog> & {
    description?: string
    title?: string
  }) => (
    <Dialog {...props}>
      <DialogHeader className='sr-only'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className='overflow-hidden p-0'>
        <Command className='[&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 **:data-[slot=command-input-wrapper]:h-12'>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  ),
  CommandInput = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) => (
    <div className='border-b flex gap-2 h-9 items-center px-3' data-slot='command-input-wrapper'>
      <SearchIcon className='opacity-50 shrink-0 size-4' />
      <CommandPrimitive.Input
        className={cn(
          'bg-transparent disabled:cursor-not-allowed disabled:opacity-50 flex h-10 outline-hidden placeholder:text-muted-foreground py-3 rounded-md text-sm w-full',
          className
        )}
        data-slot='command-input'
        {...props}
      />
    </div>
  ),
  CommandList = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) => (
    <CommandPrimitive.List
      className={cn('max-h-[300px] overflow-x-hidden overflow-y-auto scroll-py-1', className)}
      data-slot='command-list'
      {...props}
    />
  ),
  CommandEmpty = ({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => (
    <CommandPrimitive.Empty className='py-6 text-center text-sm' data-slot='command-empty' {...props} />
  ),
  CommandGroup = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) => (
    <CommandPrimitive.Group
      className={cn(
        '[&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs overflow-hidden p-1 text-foreground',
        className
      )}
      data-slot='command-group'
      {...props}
    />
  ),
  CommandSeparator = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) => (
    <CommandPrimitive.Separator
      className={cn('-mx-1 bg-border h-px', className)}
      data-slot='command-separator'
      {...props}
    />
  ),
  CommandItem = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) => (
    <CommandPrimitive.Item
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground flex gap-2 items-center outline-hidden px-2 py-1.5 relative rounded-sm select-none text-sm",
        className
      )}
      data-slot='command-item'
      {...props}
    />
  ),
  CommandShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      data-slot='command-shortcut'
      {...props}
    />
  )

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
}
