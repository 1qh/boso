'use client'

import type { Table } from '@tanstack/react-table'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@a/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@a/ui/dropdown-menu'

interface DataTableViewOptionsProps<TData> {
  readonly table: Table<TData>
}

export const DataTableViewOptions = <TData,>({ table }: DataTableViewOptionsProps<TData>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className='ml-auto hidden h-8 lg:flex' size='sm' variant='outline'>
        <MixerHorizontalIcon className='mr-2 size-4' />
        View
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align='end' className='w-[150px]'>
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>

      <DropdownMenuSeparator />

      {table
        .getAllColumns()
        .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide())
        .map(column => (
          <DropdownMenuCheckboxItem
            checked={column.getIsVisible()}
            className='capitalize'
            key={column.id}
            onCheckedChange={value => column.toggleVisibility(Boolean(value))}>
            {column.id}
          </DropdownMenuCheckboxItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
)
