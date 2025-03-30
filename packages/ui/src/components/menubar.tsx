'use client'

import { cn } from '@a/ui'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import * as React from 'react'

const Menubar = ({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>) => (
    <MenubarPrimitive.Root
      className={cn('bg-background border flex gap-1 h-9 items-center p-1 rounded-md shadow-xs', className)}
      data-slot='menubar'
      {...props}
    />
  ),
  MenubarMenu = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) => (
    <MenubarPrimitive.Menu data-slot='menubar-menu' {...props} />
  ),
  MenubarGroup = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>) => (
    <MenubarPrimitive.Group data-slot='menubar-group' {...props} />
  ),
  MenubarPortal = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) => (
    <MenubarPrimitive.Portal data-slot='menubar-portal' {...props} />
  ),
  MenubarRadioGroup = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) => (
    <MenubarPrimitive.RadioGroup data-slot='menubar-radio-group' {...props} />
  ),
  MenubarTrigger = ({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) => (
    <MenubarPrimitive.Trigger
      className={cn(
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex focus:bg-accent focus:text-accent-foreground font-medium items-center outline-hidden px-2 py-1 rounded-sm select-none text-sm',
        className
      )}
      data-slot='menubar-trigger'
      {...props}
    />
  ),
  MenubarContent = ({
    align = 'start',
    alignOffset = -4,
    className,
    sideOffset = 8,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Content>) => (
    <MenubarPortal>
      <MenubarPrimitive.Content
        align={align}
        alignOffset={alignOffset}
        className={cn(
          'bg-popover border data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden p-1 rounded-md shadow-md text-popover-foreground z-50',
          className
        )}
        data-slot='menubar-content'
        sideOffset={sideOffset}
        {...props}
      />
    </MenubarPortal>
  ),
  MenubarItem = ({
    className,
    inset,
    variant = 'default',
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
  }) => (
    <MenubarPrimitive.Item
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default dark:data-[variant=destructive]:focus:bg-destructive/20 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:*:[svg]:!text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:text-destructive flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden px-2 py-1.5 relative rounded-sm select-none text-sm",
        className
      )}
      data-inset={inset}
      data-slot='menubar-item'
      data-variant={variant}
      {...props}
    />
  ),
  MenubarCheckboxItem = ({
    checked,
    children,
    className,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) => (
    <MenubarPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default data-[disabled]:opacity-50 data-[disabled]:pointer-events-none flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden pl-8 pr-2 py-1.5 relative rounded-xs select-none text-sm",
        className
      )}
      data-slot='menubar-checkbox-item'
      {...props}>
      <span className='absolute flex items-center justify-center left-2 pointer-events-none size-3.5'>
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  ),
  MenubarRadioItem = ({ children, className, ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) => (
    <MenubarPrimitive.RadioItem
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default data-[disabled]:opacity-50 data-[disabled]:pointer-events-none flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden pl-8 pr-2 py-1.5 relative rounded-xs select-none text-sm",
        className
      )}
      data-slot='menubar-radio-item'
      {...props}>
      <span className='absolute flex items-center justify-center left-2 pointer-events-none size-3.5'>
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className='fill-current size-2' />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  ),
  MenubarLabel = ({
    className,
    inset,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }) => (
    <MenubarPrimitive.Label
      className={cn('data-[inset]:pl-8 font-medium px-2 py-1.5 text-sm', className)}
      data-inset={inset}
      data-slot='menubar-label'
      {...props}
    />
  ),
  MenubarSeparator = ({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) => (
    <MenubarPrimitive.Separator
      className={cn('-mx-1 bg-border h-px my-1', className)}
      data-slot='menubar-separator'
      {...props}
    />
  ),
  MenubarShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      data-slot='menubar-shortcut'
      {...props}
    />
  ),
  MenubarSub = ({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>) => (
    <MenubarPrimitive.Sub data-slot='menubar-sub' {...props} />
  ),
  MenubarSubTrigger = ({
    children,
    className,
    inset,
    ...props
  }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }) => (
    <MenubarPrimitive.SubTrigger
      className={cn(
        'cursor-default data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex focus:bg-accent focus:text-accent-foreground items-center outline-none px-2 py-1.5 rounded-sm select-none text-sm',
        className
      )}
      data-inset={inset}
      data-slot='menubar-sub-trigger'
      {...props}>
      {children}
      <ChevronRightIcon className='h-4 ml-auto w-4' />
    </MenubarPrimitive.SubTrigger>
  ),
  MenubarSubContent = ({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) => (
    <MenubarPrimitive.SubContent
      className={cn(
        'bg-popover border data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden p-1 rounded-md shadow-lg text-popover-foreground z-50',
        className
      )}
      data-slot='menubar-sub-content'
      {...props}
    />
  )

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
