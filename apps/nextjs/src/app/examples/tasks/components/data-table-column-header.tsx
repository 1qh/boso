import type { Column } from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@a/ui/dropdown-menu'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  readonly column: Column<TData, TValue>
  readonly title: string
}

export const DataTableColumnHeader = <TData, TValue>({
  className,
  column,
  title
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='-ml-3 h-8 data-[state=open]:bg-accent' size='sm' variant='ghost'>
            <span>{title}</span>

            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='ml-2 size-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='ml-2 size-4' />
            ) : (
              <CaretSortIcon className='ml-2 size-4' />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='mr-2 size-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='mr-2 size-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className='mr-2 size-3.5 text-muted-foreground/70' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
