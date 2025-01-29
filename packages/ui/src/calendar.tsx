import type { DayPickerProps } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@a/ui'

import { buttonVariants } from './button'

const Calendar = ({
  className,
  classNames,
  numberOfMonths,
  showOutsideDays = true,
  ...props
}: DayPickerProps) => (
  <DayPicker
    className={cn('p-3', className)}
    classNames={{
      button_next: cn(
        buttonVariants({
          className: 'absolute right-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          variant: 'outline'
        })
      ),
      button_previous: cn(
        buttonVariants({
          className: 'absolute left-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          variant: 'outline'
        })
      ),
      caption: 'relative flex items-center justify-center pt-1',
      caption_label: 'truncate text-sm font-medium',
      day: 'flex size-8 flex-1 items-center justify-center rounded-md p-0 text-sm [&:has(button)]:hover:!bg-accent [&:has(button)]:hover:text-accent-foreground [&:has(button)]:hover:aria-selected:!bg-primary [&:has(button)]:hover:aria-selected:text-primary-foreground',
      day_button: cn(
        buttonVariants({ variant: 'ghost' }),
        'size-8 p-0 font-normal transition-none hover:bg-transparent hover:text-inherit aria-selected:opacity-100'
      ),
      disabled: 'text-muted-foreground opacity-50',
      hidden: 'invisible hidden',
      month: 'w-full gap-y-4 overflow-x-hidden',
      month_caption: 'relative mx-10 flex h-7 items-center justify-center',
      month_grid: 'mt-4',
      months: 'relative flex flex-col gap-y-4 sm:flex-row sm:gap-y-0',
      nav: 'flex items-start',
      outside:
        'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
      range_end: 'day-range-end rounded-e-md',
      range_middle:
        'rounded-none aria-selected:bg-accent aria-selected:text-accent-foreground hover:aria-selected:!bg-accent hover:aria-selected:text-accent-foreground',
      range_start: 'day-range-start rounded-s-md',
      selected:
        'bg-primary text-primary-foreground hover:!bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      today: 'bg-accent text-accent-foreground',
      week: 'mt-2 flex w-full',
      weekday: 'w-8 text-[0.8rem] font-normal text-muted-foreground',
      weekdays: 'flex flex-row',
      ...classNames
    }}
    components={{
      Chevron: ({ orientation }) => {
        const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
        return <Icon className='size-4' />
      }
    }}
    numberOfMonths={numberOfMonths}
    showOutsideDays={showOutsideDays}
    style={{ width: `${248.8 * (numberOfMonths ?? 1)}px` }}
    {...props}
  />
)

export { Calendar }
Calendar.displayName = 'Calendar'
