import type { Column } from '@tanstack/react-table'
import * as React from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@a/ui'
import { Badge } from '@a/ui/badge'
import { Button } from '@a/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@a/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'
import { Separator } from '@a/ui/separator'

interface DataTableFacetedFilterProps<TData, TValue> {
  readonly column?: Column<TData, TValue>
  readonly options: {
    icon?: React.ComponentType<{ className?: string }>
    label: string
    value: string
  }[]
  readonly title?: string
}

export const DataTableFacetedFilter = <TData, TValue>({
  column,
  options,
  title
}: DataTableFacetedFilterProps<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues(),
    selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-8 border-dashed' size='sm' variant='outline'>
          <PlusCircledIcon className='mr-2 size-4' />

          {title}

          {selectedValues.size > 0 && (
            <>
              <Separator className='mx-2 h-4' orientation='vertical' />

              <Badge className='rounded-sm px-1 font-normal lg:hidden' variant='secondary'>
                {selectedValues.size}
              </Badge>

              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge className='rounded-sm px-1 font-normal' variant='secondary'>
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter(option => selectedValues.has(option.value))
                    .map(option => (
                      <Badge
                        className='rounded-sm px-1 font-normal'
                        key={option.value}
                        variant='secondary'>
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align='start' className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={title} />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {options.map(option => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(filterValues.length ? filterValues : undefined)
                    }}>
                    <div
                      className={cn(
                        'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}>
                      <CheckIcon className={cn('size-4')} />
                    </div>

                    {option.icon ? (
                      <option.icon className='mr-2 size-4 text-muted-foreground' />
                    ) : null}

                    <span>{option.label}</span>

                    {facets?.get(option.value) ? (
                      <span className='ml-auto flex size-4 items-center justify-center font-mono text-xs'>
                        {facets.get(option.value)}
                      </span>
                    ) : null}
                  </CommandItem>
                )
              })}
            </CommandGroup>

            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />

                <CommandGroup>
                  <CommandItem
                    className='justify-center text-center'
                    onSelect={() => column?.setFilterValue(undefined)}>
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
