'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '@a/ui'

const MenubarMenu = MenubarPrimitive.Menu,
  MenubarGroup = MenubarPrimitive.Group,
  MenubarPortal = MenubarPrimitive.Portal,
  MenubarSub = MenubarPrimitive.Sub,
  MenubarRadioGroup = MenubarPrimitive.RadioGroup,
  Menubar = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
  >(({ className, ...props }, ref) => (
    <MenubarPrimitive.Root
      className={cn(
        'flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  )),
  MenubarTrigger = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
  >(({ className, ...props }, ref) => (
    <MenubarPrimitive.Trigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        className
      )}
      ref={ref}
      {...props}
    />
  )),
  MenubarSubTrigger = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
      readonly inset?: boolean
    }
  >(({ children, className, inset, ...props }, ref) => (
    <MenubarPrimitive.SubTrigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}>
      {children}
      <ChevronRight className='ml-auto size-4' />
    </MenubarPrimitive.SubTrigger>
  )),
  MenubarSubContent = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
  >(({ className, ...props }, ref) => (
    <MenubarPrimitive.SubContent
      className={cn(
        'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      ref={ref}
      {...props}
    />
  )),
  MenubarContent = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
  >(({ align = 'start', alignOffset = -4, className, sideOffset = 8, ...props }, ref) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        align={align}
        alignOffset={alignOffset}
        className={cn(
          'z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )),
  MenubarItem = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
      readonly inset?: boolean
    }
  >(({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      ref={ref}
      {...props}
    />
  )),
  MenubarCheckboxItem = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
  >(({ checked, children, className, ...props }, ref) => (
    <MenubarPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}>
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <Check className='size-4' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )),
  MenubarRadioItem = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
  >(({ children, className, ...props }, ref) => (
    <MenubarPrimitive.RadioItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      ref={ref}
      {...props}>
      <span className='absolute left-2 flex size-3.5 items-center justify-center'>
        <MenubarPrimitive.ItemIndicator>
          <Circle className='size-4 fill-current' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )),
  MenubarLabel = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
      readonly inset?: boolean
    }
  >(({ className, inset, ...props }, ref) => (
    <MenubarPrimitive.Label
      className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
      ref={ref}
      {...props}
    />
  )),
  MenubarSeparator = React.forwardRef<
    React.ComponentRef<typeof MenubarPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
  >(({ className, ...props }, ref) => (
    <MenubarPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-muted', className)}
      ref={ref}
      {...props}
    />
  )),
  MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  )
MenubarShortcut.displayname = 'MenubarShortcut'

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
}
Menubar.displayName = MenubarPrimitive.Root.displayName
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName
MenubarContent.displayName = MenubarPrimitive.Content.displayName
MenubarItem.displayName = MenubarPrimitive.Item.displayName
MenubarLabel.displayName = MenubarPrimitive.Label.displayName
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName
