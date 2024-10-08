'use client'

import type { PopoverProps } from '@radix-ui/react-popover'
import * as React from 'react'
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@a/ui/hover-card'
import { Label } from '@a/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'

import type { Model, ModelType } from '../data/models'
import { useMutationObserver } from './use-mutation-observer'

interface ModelItemProps {
  readonly isSelected: boolean
  readonly model: Model
  readonly onPeek: (model: Model) => void
  readonly onSelect: () => void
}

interface ModelSelectorProps extends PopoverProps {
  readonly models: Model[]
  readonly types: readonly ModelType[]
}

const ModelItem = ({ isSelected, model, onPeek, onSelect }: ModelItemProps) => {
    const ref = React.useRef<HTMLDivElement>(null)

    useMutationObserver(ref, mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'aria-selected' &&
          ref.current?.getAttribute('aria-selected') === 'true'
        ) {
          onPeek(model)
        }
      })
    })

    return (
      <CommandItem
        className='data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground'
        key={model.id}
        onSelect={onSelect}
        ref={ref}>
        {model.name}

        <CheckIcon className={cn('ml-auto size-4', isSelected ? 'opacity-100' : 'opacity-0')} />
      </CommandItem>
    )
  },
  ModelSelector = ({ models, types, ...props }: ModelSelectorProps) => {
    const [open, setOpen] = React.useState(false),
      [selectedModel, setSelectedModel] = React.useState<Model>(models[0] ?? ({} as Model)),
      [peekedModel, setPeekedModel] = React.useState<Model>(models[0] ?? ({} as Model))

    return (
      <div className='grid gap-2'>
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor='model'>Model</Label>
          </HoverCardTrigger>

          <HoverCardContent align='start' className='w-[260px] text-sm' side='left'>
            The model which will generate the completion. Some models are suitable for natural
            language tasks, others specialize in code. Learn more.
          </HoverCardContent>
        </HoverCard>

        <Popover onOpenChange={setOpen} open={open} {...props}>
          <PopoverTrigger asChild>
            <Button
              aria-expanded={open}
              aria-label='Select a model'
              className='w-full justify-between'
              role='combobox'
              variant='outline'>
              {selectedModel.id ? selectedModel.name : 'Select a model...'}

              <CaretSortIcon className='ml-2 size-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>

          <PopoverContent align='end' className='w-[250px] p-0'>
            <HoverCard>
              <HoverCardContent align='start' className='min-h-[280px]' forceMount side='left'>
                <div className='grid gap-2'>
                  <h4 className='font-medium leading-none'>{peekedModel.name}</h4>

                  <div className='text-sm text-muted-foreground'>{peekedModel.description}</div>

                  {peekedModel.strengths ? (
                    <div className='mt-4 grid gap-2'>
                      <h5 className='text-sm font-medium leading-none'>Strengths</h5>

                      <ul className='text-sm text-muted-foreground'>{peekedModel.strengths}</ul>
                    </div>
                  ) : null}
                </div>
              </HoverCardContent>

              <Command loop>
                <CommandList className='h-[var(--cmdk-list-height)] max-h-[400px]'>
                  <CommandInput placeholder='Search Models...' />

                  <CommandEmpty>No Models found.</CommandEmpty>

                  <HoverCardTrigger />

                  {types.map(type => (
                    <CommandGroup heading={type} key={type}>
                      {models
                        .filter(m => m.type === type)
                        .map(m => (
                          <ModelItem
                            isSelected={selectedModel.id === m.id}
                            key={m.id}
                            model={m}
                            onPeek={model => setPeekedModel(model)}
                            onSelect={() => {
                              setSelectedModel(m)
                              setOpen(false)
                            }}
                          />
                        ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </HoverCard>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

export { ModelSelector }
