'use client'

import { cn } from '@a/ui'
import { buttonVariants } from '@a/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) => (
  <DayPicker
    className={cn('p-3', className)}
    classNames={{
      caption: 'flex justify-center pt-1 relative items-center w-full',
      caption_label: 'text-sm font-medium',
      cell: cn(
        '[&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:bg-accent focus-within:relative focus-within:z-20 p-0 relative text-center text-sm',
        props.mode === 'range'
          ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
          : '[&:has([aria-selected])]:rounded-md'
      ),
      day: cn(buttonVariants({ variant: 'ghost' }), 'aria-selected:opacity-100 font-normal p-0 size-8'),
      day_disabled: 'text-muted-foreground opacity-50',
      day_hidden: 'invisible',
      day_outside: 'day-outside text-muted-foreground aria-selected:text-muted-foreground',
      day_range_end: 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
      day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
      day_range_start: 'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
      day_selected:
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      day_today: 'bg-accent text-accent-foreground',
      head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
      head_row: 'flex',
      month: 'flex flex-col gap-4',
      months: 'flex flex-col sm:flex-row gap-2',
      nav: 'flex items-center gap-1',
      nav_button: cn(buttonVariants({ variant: 'outline' }), 'bg-transparent hover:opacity-100 opacity-50 p-0 size-7'),
      nav_button_next: 'absolute right-1',
      nav_button_previous: 'absolute left-1',
      row: 'flex w-full mt-2',
      table: 'w-full border-collapse space-x-1',
      ...classNames
    }}
    components={{
      IconLeft: ({ className: cln, ...prs }) => <ChevronLeft className={cn('size-4', cln)} {...prs} />,
      IconRight: ({ className: cln, ...prs }) => <ChevronRight className={cn('size-4', cln)} {...prs} />
    }}
    showOutsideDays={showOutsideDays}
    {...props}
  />
)

export { Calendar }
