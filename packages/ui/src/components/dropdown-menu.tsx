'use client'

import { cn } from '@a/ui'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import * as React from 'react'

const DropdownMenu = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) => (
    <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
  ),
  DropdownMenuPortal = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) => (
    <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
  ),
  DropdownMenuTrigger = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) => (
    <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
  ),
  DropdownMenuContent = ({
    className,
    sideOffset = 4,
    ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          'bg-popover border data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto p-1 rounded-md shadow-md text-popover-foreground z-50',
          className
        )}
        data-slot='dropdown-menu-content'
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  ),
  DropdownMenuGroup = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) => (
    <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
  ),
  DropdownMenuItem = ({
    className,
    inset,
    variant = 'default',
    ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
  }) => (
    <DropdownMenuPrimitive.Item
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default dark:data-[variant=destructive]:focus:bg-destructive/20 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:*:[svg]:!text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:text-destructive flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden px-2 py-1.5 relative rounded-sm select-none text-sm",
        className
      )}
      data-inset={inset}
      data-slot='dropdown-menu-item'
      data-variant={variant}
      {...props}
    />
  ),
  DropdownMenuCheckboxItem = ({
    checked,
    children,
    className,
    ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default data-[disabled]:opacity-50 data-[disabled]:pointer-events-none flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden pl-8 pr-2 py-1.5 relative rounded-sm select-none text-sm",
        className
      )}
      data-slot='dropdown-menu-checkbox-item'
      {...props}>
      <span className='absolute flex items-center justify-center left-2 pointer-events-none size-3.5'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  ),
  DropdownMenuRadioGroup = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) => (
    <DropdownMenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />
  ),
  DropdownMenuRadioItem = ({
    children,
    className,
    ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default data-[disabled]:opacity-50 data-[disabled]:pointer-events-none flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden pl-8 pr-2 py-1.5 relative rounded-sm select-none text-sm",
        className
      )}
      data-slot='dropdown-menu-radio-item'
      {...props}>
      <span className='absolute flex items-center justify-center left-2 pointer-events-none size-3.5'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className='fill-current size-2' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  ),
  DropdownMenuLabel = ({
    className,
    inset,
    ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }) => (
    <DropdownMenuPrimitive.Label
      className={cn('data-[inset]:pl-8 font-medium px-2 py-1.5 text-sm', className)}
      data-inset={inset}
      data-slot='dropdown-menu-label'
      {...props}
    />
  ),
  DropdownMenuSeparator = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
    <DropdownMenuPrimitive.Separator
      className={cn('-mx-1 bg-border h-px my-1', className)}
      data-slot='dropdown-menu-separator'
      {...props}
    />
  ),
  DropdownMenuShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      data-slot='dropdown-menu-shortcut'
      {...props}
    />
  ),
  DropdownMenuSub = ({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) => (
    <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />
  ),
  DropdownMenuSubTrigger = ({
    children,
    className,
    inset,
    ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }) => (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        'cursor-default data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex focus:bg-accent focus:text-accent-foreground items-center outline-hidden px-2 py-1.5 rounded-sm select-none text-sm',
        className
      )}
      data-inset={inset}
      data-slot='dropdown-menu-sub-trigger'
      {...props}>
      {children}
      <ChevronRightIcon className='ml-auto size-4' />
    </DropdownMenuPrimitive.SubTrigger>
  ),
  DropdownMenuSubContent = ({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) => (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        'bg-popover border data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden p-1 rounded-md shadow-lg text-popover-foreground z-50',
        className
      )}
      data-slot='dropdown-menu-sub-content'
      {...props}
    />
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
