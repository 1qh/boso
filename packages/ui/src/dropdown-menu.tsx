'use client'

import * as React from 'react'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { cn } from '@a/ui'

const DropdownMenu = DropdownMenuPrimitive.Root,
  DropdownMenuTrigger = DropdownMenuPrimitive.Trigger,
  DropdownMenuGroup = DropdownMenuPrimitive.Group,
  DropdownMenuPortal = DropdownMenuPrimitive.Portal,
  DropdownMenuSub = DropdownMenuPrimitive.Sub,
  DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup,
  DropdownMenuSubTrigger = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
      readonly inset?: boolean
    }
  >(({ children, className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}>
      {children}
      <ChevronRight className='ml-auto' />
    </DropdownMenuPrimitive.SubTrigger>
  )),
  DropdownMenuSubContent = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
  >(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      ref={ref}
      {...props}
    />
  )),
  DropdownMenuContent = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
  >(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )),
  DropdownMenuItem = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
      readonly inset?: boolean
    }
  >(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}
    />
  )),
  DropdownMenuCheckboxItem = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
  >(({ checked, children, className, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}>
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className='size-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )),
  DropdownMenuRadioItem = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
  >(({ children, className, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}>
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className='size-2 fill-current' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )),
  DropdownMenuLabel = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
      readonly inset?: boolean
    }
  >(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
      ref={ref}
      {...props}
    />
  )),
  DropdownMenuSeparator = React.forwardRef<
    React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
  >(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-muted', className)}
      ref={ref}
      {...props}
    />
  )),
  DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
  )

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
}
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName
