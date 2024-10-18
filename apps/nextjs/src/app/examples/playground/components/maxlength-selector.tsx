'use client'

import type { SliderProps } from '@radix-ui/react-slider'
import * as React from 'react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@a/ui/hover-card'
import { Label } from '@a/ui/label'
import { Slider } from '@a/ui/slider'

interface MaxLengthSelectorProps {
  readonly defaultValue: SliderProps['defaultValue']
}

export const MaxLengthSelector = ({ defaultValue }: MaxLengthSelectorProps) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className='grid gap-2 pt-2'>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className='grid gap-4'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='maxlength'>Maximum Length</Label>

              <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
                {value}
              </span>
            </div>

            <Slider
              aria-label='Maximum Length'
              className='[&_[role=slider]]:size-4'
              defaultValue={value}
              id='maxlength'
              max={4000}
              onValueChange={setValue}
              step={10}
            />
          </div>
        </HoverCardTrigger>

        <HoverCardContent align='start' className='w-[260px] text-sm' side='left'>
          The maximum number of tokens to generate. Requests can use up to 2,048 or 4,000 tokens,
          shared between prompt and completion. The exact limit varies by model.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
