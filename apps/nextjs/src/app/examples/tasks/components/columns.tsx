'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@a/ui/badge'
import { Checkbox } from '@a/ui/checkbox'

import type { Task } from '../data/schema'
import { labels, priorities, statuses } from '../data/data'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Task>[] = [
  {
    cell: ({ row }) => (
      <Checkbox
        aria-label='Select row'
        checked={row.getIsSelected()}
        className='translate-y-[2px]'
        onCheckedChange={value => row.toggleSelected(Boolean(value))}
      />
    ),
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        aria-label='Select all'
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        className='translate-y-[2px]'
        onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))}
      />
    ),
    id: 'select'
  },
  {
    accessorKey: 'id',
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title='Task' />
  },
  {
    accessorKey: 'title',
    cell: ({ row }) => {
      const label = labels.find(l => l.value === row.original.label)

      return (
        <div className='flex space-x-2'>
          {label ? <Badge variant='outline'>{label.label}</Badge> : null}

          <span className='max-w-[500px] truncate font-medium'>{row.getValue('title')}</span>
        </div>
      )
    },
    header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = statuses.find(s => s.value === row.getValue('status'))

      if (!status) {
        return null
      }

      return (
        <div className='flex w-[100px] items-center'>
          <status.icon className='mr-2 size-4 text-muted-foreground' />

          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => (value as string[]).includes(row.getValue(id)),
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />
  },
  {
    accessorKey: 'priority',
    cell: ({ row }) => {
      const priority = priorities.find(p => p.value === row.getValue('priority'))

      if (!priority) {
        return null
      }

      return (
        <div className='flex items-center'>
          <priority.icon className='mr-2 size-4 text-muted-foreground' />

          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => (value as string[]).includes(row.getValue(id)),
    header: ({ column }) => <DataTableColumnHeader column={column} title='Priority' />
  },
  {
    cell: ({ row }) => <DataTableRowActions row={row} />,
    id: 'actions'
  }
]
