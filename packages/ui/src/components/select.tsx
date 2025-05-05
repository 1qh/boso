'use client'

import { cn } from '@a/ui'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import * as React from 'react'

const Select = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) => (
    <SelectPrimitive.Root data-slot='select' {...props} />
  ),
  SelectGroup = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) => (
    <SelectPrimitive.Group data-slot='select-group' {...props} />
  ),
  SelectValue = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) => (
    <SelectPrimitive.Value data-slot='select-value' {...props} />
  ),
  SelectTrigger = ({
    children,
    className,
    size = 'default',
    ...props
  }: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: 'default' | 'sm'
  }) => (
    <SelectPrimitive.Trigger
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-2 *:data-[slot=select-value]:items-center *:data-[slot=select-value]:line-clamp-1 aria-invalid:border-destructive aria-invalid:ring-destructive/20 bg-transparent border border-input dark:aria-invalid:ring-destructive/40 dark:bg-input/30 dark:hover:bg-input/50 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 disabled:cursor-not-allowed disabled:opacity-50 flex focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 gap-2 items-center justify-between outline-none px-3 py-2 rounded-md shadow-xs text-sm transition-[color,box-shadow] w-fit whitespace-nowrap",
        className
      )}
      data-size={size}
      data-slot='select-trigger'
      {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className='opacity-50 size-4' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
  SelectScrollUpButton = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => (
    <SelectPrimitive.ScrollUpButton
      className={cn('cursor-default flex items-center justify-center py-1', className)}
      data-slot='select-scroll-up-button'
      {...props}>
      <ChevronUpIcon className='size-4' />
    </SelectPrimitive.ScrollUpButton>
  ),
  SelectScrollDownButton = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => (
    <SelectPrimitive.ScrollDownButton
      className={cn('cursor-default flex items-center justify-center py-1', className)}
      data-slot='select-scroll-down-button'
      {...props}>
      <ChevronDownIcon className='size-4' />
    </SelectPrimitive.ScrollDownButton>
  ),
  SelectContent = ({
    children,
    className,
    position = 'popper',
    ...props
  }: React.ComponentProps<typeof SelectPrimitive.Content>) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'bg-popover border data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto relative rounded-md shadow-md text-popover-foreground z-50',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        data-slot='select-content'
        position={position}
        {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)] scroll-my-1 w-full'
          )}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
  SelectLabel = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) => (
    <SelectPrimitive.Label
      className={cn('px-2 py-1.5 text-muted-foreground text-xs', className)}
      data-slot='select-label'
      {...props}
    />
  ),
  SelectItem = ({ children, className, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) => (
    <SelectPrimitive.Item
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:gap-2 *:[span]:last:items-center cursor-default data-[disabled]:opacity-50 data-[disabled]:pointer-events-none flex focus:bg-accent focus:text-accent-foreground gap-2 items-center outline-hidden pl-2 pr-8 py-1.5 relative rounded-sm select-none text-sm w-full",
        className
      )}
      data-slot='select-item'
      {...props}>
      <span className='absolute flex items-center justify-center right-2 size-3.5'>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className='size-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
  SelectSeparator = ({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) => (
    <SelectPrimitive.Separator
      className={cn('-mx-1 bg-border h-px my-1 pointer-events-none', className)}
      data-slot='select-separator'
      {...props}
    />
  )

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
