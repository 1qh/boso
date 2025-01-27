'use client'

import { addDays } from 'date-fns'

import { Calendar } from '@a/ui/calendar'
import { Card, CardContent } from '@a/ui/card'

const start = new Date(2023, 5, 5)

export const CardsCalendar = () => (
  <Card className='max-w-[260px]'>
    <CardContent className='p-1'>
      <Calendar
        defaultMonth={start}
        mode='range'
        numberOfMonths={1}
        selected={{
          from: start,
          to: addDays(start, 8)
        }}
      />
    </CardContent>
  </Card>
)
