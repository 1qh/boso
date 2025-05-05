'use client'

import { cn } from '@a/ui'
import * as React from 'react'

const Table = ({ className, ...props }: React.ComponentProps<'table'>) => (
    <div className='overflow-x-auto relative w-full' data-slot='table-container'>
      <table className={cn('caption-bottom text-sm w-full', className)} data-slot='table' {...props} />
    </div>
  ),
  TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => (
    <thead className={cn('[&_tr]:border-b', className)} data-slot='table-header' {...props} />
  ),
  TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} data-slot='table-body' {...props} />
  ),
  TableFooter = ({ className, ...props }: React.ComponentProps<'tfoot'>) => (
    <tfoot
      className={cn('[&>tr]:last:border-b-0 bg-muted/50 border-t font-medium', className)}
      data-slot='table-footer'
      {...props}
    />
  ),
  TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => (
    <tr
      className={cn('border-b data-[state=selected]:bg-muted hover:bg-muted/50 transition-colors', className)}
      data-slot='table-row'
      {...props}
    />
  ),
  TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => (
    <th
      className={cn(
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] align-middle font-medium h-10 px-2 text-foreground text-left whitespace-nowrap',
        className
      )}
      data-slot='table-head'
      {...props}
    />
  ),
  TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => (
    <td
      className={cn(
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] align-middle p-2 whitespace-nowrap',
        className
      )}
      data-slot='table-cell'
      {...props}
    />
  ),
  TableCaption = ({ className, ...props }: React.ComponentProps<'caption'>) => (
    <caption className={cn('mt-4 text-muted-foreground text-sm', className)} data-slot='table-caption' {...props} />
  )

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
