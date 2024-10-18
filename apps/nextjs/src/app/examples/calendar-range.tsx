'use client'

import type { DateRange } from 'react-day-picker'
import { useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Calendar } from '@a/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'

export default function CalendarRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20)
  })

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button className={cn(!date && 'text-muted-foreground')} id='date' variant='outline'>
            <CalendarIcon className='mr-2 size-4' />

            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align='center' className='w-auto p-0'>
          <Calendar
            autoFocus
            defaultMonth={date?.from}
            mode='range'
            numberOfMonths={2}
            onSelect={setDate}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
