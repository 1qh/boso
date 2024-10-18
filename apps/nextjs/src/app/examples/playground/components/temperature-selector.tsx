'use client'

import type { SliderProps } from '@radix-ui/react-slider'
import * as React from 'react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@a/ui/hover-card'
import { Label } from '@a/ui/label'
import { Slider } from '@a/ui/slider'

interface TemperatureSelectorProps {
  readonly defaultValue: SliderProps['defaultValue']
}

export const TemperatureSelector = ({ defaultValue }: TemperatureSelectorProps) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className='grid gap-2 pt-2'>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className='grid gap-4'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='temperature'>Temperature</Label>

              <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
                {value}
              </span>
            </div>

            <Slider
              aria-label='Temperature'
              className='[&_[role=slider]]:size-4'
              defaultValue={value}
              id='temperature'
              max={1}
              onValueChange={setValue}
              step={0.1}
            />
          </div>
        </HoverCardTrigger>

        <HoverCardContent align='start' className='w-[260px] text-sm' side='left'>
          Controls randomness: lowering results in less random completions. As the temperature
          approaches zero, the model will become deterministic and repetitive.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
