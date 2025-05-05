'use client'

import { cn } from '@a/ui'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import * as React from 'react'

const RadioGroup = ({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => (
    <RadioGroupPrimitive.Root className={cn('gap-3 grid', className)} data-slot='radio-group' {...props} />
  ),
  RadioGroupItem = ({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => (
    <RadioGroupPrimitive.Item
      className={cn(
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aspect-square border border-input dark:aria-invalid:ring-destructive/40 dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none rounded-full shadow-xs shrink-0 size-4 text-primary transition-[color,box-shadow]',
        className
      )}
      data-slot='radio-group-item'
      {...props}>
      <RadioGroupPrimitive.Indicator
        className='flex items-center justify-center relative'
        data-slot='radio-group-indicator'>
        <CircleIcon className='-translate-x-1/2 -translate-y-1/2 absolute fill-primary left-1/2 size-2 top-1/2' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )

export { RadioGroup, RadioGroupItem }
