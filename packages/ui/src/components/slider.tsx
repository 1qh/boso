'use client'

import { cn } from '@a/ui'
import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

const Slider = ({
  className,
  defaultValue,
  max = 100,
  min = 0,
  value,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) => {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      className={cn(
        'data-[disabled]:opacity-50 data-[orientation=vertical]:flex-col data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto flex items-center relative select-none touch-none w-full',
        className
      )}
      data-slot='slider'
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}>
      <SliderPrimitive.Track
        className={cn(
          'bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5 grow overflow-hidden relative rounded-full'
        )}
        data-slot='slider-track'>
        <SliderPrimitive.Range
          className={cn('absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full')}
          data-slot='slider-range'
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          className='bg-background block border border-primary disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-hidden focus-visible:ring-4 hover:ring-4 ring-ring/50 rounded-full shadow-sm shrink-0 size-4 transition-[color,box-shadow]'
          data-slot='slider-thumb'
          key={index}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
