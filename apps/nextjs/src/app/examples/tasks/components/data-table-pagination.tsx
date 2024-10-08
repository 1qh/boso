import type { Table } from '@tanstack/react-table'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'

import { Button } from '@a/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@a/ui/select'

interface DataTablePaginationProps<TData> {
  readonly table: Table<TData>
}

export const DataTablePagination = <TData,>({ table }: DataTablePaginationProps<TData>) => (
  <div className='flex items-center justify-between px-2'>
    <div className='flex-1 text-sm text-muted-foreground'>
      {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{' '}
      row(s) selected.
    </div>

    <div className='flex items-center space-x-6 lg:space-x-8'>
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>Rows per page</p>

        <Select
          onValueChange={value => {
            table.setPageSize(Number(value))
          }}
          value={`${table.getState().pagination.pageSize}`}>
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>

          <SelectContent side='top'>
            {[10, 20, 30, 40, 50].map(pageSize => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>

      <div className='flex items-center space-x-2'>
        <Button
          className='hidden size-8 p-0 lg:flex'
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          variant='outline'>
          <span className='sr-only'>Go to first page</span>

          <DoubleArrowLeftIcon className='size-4' />
        </Button>

        <Button
          className='size-8 p-0'
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          variant='outline'>
          <span className='sr-only'>Go to previous page</span>

          <ChevronLeftIcon className='size-4' />
        </Button>

        <Button
          className='size-8 p-0'
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          variant='outline'>
          <span className='sr-only'>Go to next page</span>

          <ChevronRightIcon className='size-4' />
        </Button>

        <Button
          className='hidden size-8 p-0 lg:flex'
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          variant='outline'>
          <span className='sr-only'>Go to last page</span>

          <DoubleArrowRightIcon className='size-4' />
        </Button>
      </div>
    </div>
  </div>
)
