'use client'

import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'
import { Label as LabelPrimitive } from 'radix-ui'

import { cn } from '@a/ui'

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  ),
  Label = React.forwardRef<
    React.ComponentRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
  >(({ className, ...props }, ref) => (
    <LabelPrimitive.Root className={cn(labelVariants(), className)} ref={ref} {...props} />
  ))

export { Label }
Label.displayName = LabelPrimitive.Root.displayName
