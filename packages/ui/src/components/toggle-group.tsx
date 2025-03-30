'use client'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '@a/ui'
import { toggleVariants } from '@a/ui/toggle'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import * as React from 'react'

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
    size: 'default',
    variant: 'default'
  }),
  ToggleGroup = ({
    children,
    className,
    size,
    variant,
    ...props
  }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>) => (
    <ToggleGroupPrimitive.Root
      className={cn('data-[variant=outline]:shadow-xs flex group/toggle-group items-center rounded-md w-fit', className)}
      data-size={size}
      data-slot='toggle-group'
      data-variant={variant}
      {...props}>
      <ToggleGroupContext.Provider value={{ size, variant }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  ),
  ToggleGroupItem = ({
    children,
    className,
    size,
    variant,
    ...props
  }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) => {
    const context = React.useContext(ToggleGroupContext)
    return (
      <ToggleGroupPrimitive.Item
        className={cn(
          toggleVariants({
            size: context.size ?? size,
            variant: context.variant ?? variant
          }),
          'data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l first:rounded-l-md flex-1 focus-visible:z-10 focus:z-10 last:rounded-r-md min-w-0 rounded-none shadow-none shrink-0',
          className
        )}
        data-size={context.size ?? size}
        data-slot='toggle-group-item'
        data-variant={context.variant ?? variant}
        {...props}>
        {children}
      </ToggleGroupPrimitive.Item>
    )
  }

export { ToggleGroup, ToggleGroupItem }
