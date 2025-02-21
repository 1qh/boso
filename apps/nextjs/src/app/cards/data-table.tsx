'use client'

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table'
import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@a/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@a/ui/card'
import { Checkbox } from '@a/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@a/ui/dropdown-menu'
import { Input } from '@a/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@a/ui/table'

const data: Payment[] = [
  {
    amount: 316,
    email: 'ken99@yahoo.com',
    id: 'm5gr84i9',
    status: 'success'
  },
  {
    amount: 242,
    email: 'Abe45@gmail.com',
    id: '3u1reuv4',
    status: 'success'
  },
  {
    amount: 837,
    email: 'Monserrat44@gmail.com',
    id: 'derv1ws0',
    status: 'processing'
  },
  {
    amount: 721,
    email: 'carmella@hotmail.com',
    id: 'bhqecj4p',
    status: 'failed'
  }
]

export interface Payment {
  amount: number
  email: string
  id: string
  status: 'pending' | 'processing' | 'success' | 'failed'
}

export const columns: ColumnDef<Payment>[] = [
  {
    cell: ({ row }) => (
      <Checkbox
        aria-label='Select row'
        checked={row.getIsSelected()}
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
        onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))}
      />
    ),
    id: 'select'
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('status')}</div>,
    header: 'Status'
  },
  {
    accessorKey: 'email',
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
    header: ({ column }) => (
      <Button onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} variant='ghost'>
        Email
        <ArrowUpDown />
      </Button>
    )
  },
  {
    accessorKey: 'amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount')),
        // Format the amount as a dollar amount
        formatted = new Intl.NumberFormat('en-US', {
          currency: 'USD',
          style: 'currency'
        }).format(amount)

      return <div className='text-right font-medium'>{formatted}</div>
    },
    header: () => <div className='text-right'>Amount</div>
  },
  {
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='size-8 p-0' variant='ghost'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableHiding: false,
    id: 'actions'
  }
]

export const CardsDataTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]),
    [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]),
    [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({}),
    [rowSelection, setRowSelection] = React.useState({}),
    table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      state: {
        columnFilters,
        columnVisibility,
        rowSelection,
        sorting
      }
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Payments</CardTitle>
        <CardDescription>Manage your payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-4 flex items-center gap-4'>
          <Input
            className='max-w-sm'
            onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
            placeholder='Filter emails...'
            value={table.getColumn('email')?.getFilterValue() as string}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='ml-auto' variant='outline'>
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
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
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead className='[&:has([role=checkbox])]:pl-3' key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow data-state={row.getIsSelected() && 'selected'} key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell className='[&:has([role=checkbox])]:pl-3' key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className='h-24 text-center' colSpan={columns.length}>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 pt-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='space-x-2'>
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size='sm'
              variant='outline'>
              Previous
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              size='sm'
              variant='outline'>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
