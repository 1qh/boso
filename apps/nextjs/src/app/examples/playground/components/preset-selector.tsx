'use client'

import type { PopoverProps } from '@radix-ui/react-popover'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@a/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'

import type { Preset } from '../data/presets'

interface PresetSelectorProps extends PopoverProps {
  readonly presets: Preset[]
}

export const PresetSelector = ({ presets, ...props }: PresetSelectorProps) => {
  const [open, setOpen] = React.useState(false),
    [selectedPreset, setSelectedPreset] = React.useState<Preset>(),
    router = useRouter()

  return (
    <Popover onOpenChange={setOpen} open={open} {...props}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          aria-label='Load a preset...'
          className='flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]'
          role='combobox'
          variant='outline'>
          {selectedPreset ? selectedPreset.name : 'Load a preset...'}

          <CaretSortIcon className='ml-2 size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput placeholder='Search presets...' />

          <CommandEmpty>No presets found.</CommandEmpty>

          <CommandGroup heading='Examples'>
            <CommandList>
              {presets.map(preset => (
                <CommandItem
                  key={preset.id}
                  onSelect={() => {
                    setSelectedPreset(preset)
                    setOpen(false)
                  }}>
                  {preset.name}

                  <CheckIcon
                    className={cn(
                      'ml-auto size-4',
                      selectedPreset?.id === preset.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>

          <CommandGroup className='pt-0'>
            <CommandItem onSelect={() => router.push('/examples')}>More examples</CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
