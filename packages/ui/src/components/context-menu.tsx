'use client'

import { cn } from '@a/ui'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import * as React from 'react'

const ContextMenu = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Root>) => (
    <ContextMenuPrimitive.Root data-slot='context-menu' {...props} />
  ),
  ContextMenuTrigger = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) => (
    <ContextMenuPrimitive.Trigger data-slot='context-menu-trigger' {...props} />
  ),
  ContextMenuGroup = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Group>) => (
    <ContextMenuPrimitive.Group data-slot='context-menu-group' {...props} />
  ),
  ContextMenuPortal = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) => (
    <ContextMenuPrimitive.Portal data-slot='context-menu-portal' {...props} />
  ),
  ContextMenuSub = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) => (
    <ContextMenuPrimitive.Sub data-slot='context-menu-sub' {...props} />
  ),
  ContextMenuRadioGroup = ({ ...props }: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) => (
    <ContextMenuPrimitive.RadioGroup data-slot='context-menu-radio-group' {...props} />
  ),
  ContextMenuSubTrigger = ({
    children,
    className,
    inset,
    ...props
  }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }) => (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex focus:bg-accent focus:text-accent-foreground items-center outline-hidden px-2 py-1.5 rounded-sm select-none text-sm",
        className
      )}
      data-inset={inset}
      data-slot='context-menu-sub-trigger'
      {...props}>
      {children}
      <ChevronRightIcon className='ml-auto' />
    </ContextMenuPrimitive.SubTrigger>
  ),
  ContextMenuSubContent = ({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) => (
    <ContextMenuPrimitive.SubContent
      className={cn(
        'bg-popover border data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden p-1 rounded-md shadow-lg text-popover-foreground z-50',
        className
      )}
      data-slot='context-menu-sub-content'
      {...props}
    />
  ),
  ContextMenuContent = ({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) => (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        className={cn(
          'bg-popover border data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto p-1 rounded-md shadow-md text-popover-foreground z-50',
          className
        )}
        data-slot='context-menu-content'
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  ),
  ContextMenuItem = ({
    className,
    inset,
    variant = 'default',
    ...props
  }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
    variant?: 'default' | 'destructive'
  }) => (
    <ContextMenuPrimitive.Item
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default dark:data-[variant=destructive]:focus:bg-destructive/20 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:*:[svg]:!text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:text-destructive flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden px-2 py-1.5 relative rounded-sm select-none text-sm",
        className
      )}
      data-inset={inset}
      data-slot='context-menu-item'
      data-variant={variant}
      {...props}
    />
  ),
  ContextMenuCheckboxItem = ({
    checked,
    children,
    className,
    ...props
  }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) => (
    <ContextMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default data-[disabled]:opacity-50 data-[disabled]:pointer-events-none flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden pl-8 pr-2 py-1.5 relative rounded-sm select-none text-sm",
        className
      )}
      data-slot='context-menu-checkbox-item'
      {...props}>
      <span className='absolute flex items-center justify-center left-2 pointer-events-none size-3.5'>
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  ),
  ContextMenuRadioItem = ({
    children,
    className,
    ...props
  }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) => (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-default data-[disabled]:opacity-50 data-[disabled]:pointer-events-none flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden pl-8 pr-2 py-1.5 relative rounded-sm select-none text-sm",
        className
      )}
      data-slot='context-menu-radio-item'
      {...props}>
      <span className='absolute flex items-center justify-center left-2 pointer-events-none size-3.5'>
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className='fill-current size-2' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  ),
  ContextMenuLabel = ({
    className,
    inset,
    ...props
  }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }) => (
    <ContextMenuPrimitive.Label
      className={cn('data-[inset]:pl-8 font-medium px-2 py-1.5 text-foreground text-sm', className)}
      data-inset={inset}
      data-slot='context-menu-label'
      {...props}
    />
  ),
  ContextMenuSeparator = ({ className, ...props }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) => (
    <ContextMenuPrimitive.Separator
      className={cn('-mx-1 bg-border h-px my-1', className)}
      data-slot='context-menu-separator'
      {...props}
    />
  ),
  ContextMenuShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => (
    <span
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      data-slot='context-menu-shortcut'
      {...props}
    />
  )

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
}
