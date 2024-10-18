import { Card, CardContent } from '@a/ui/card'
import { Label } from '@a/ui/label'

import CalendarRange from '../../calendar-range'

export const DemoDatePicker = () => (
  <Card>
    <CardContent className='pt-6'>
      <div className='space-y-2'>
        <Label className='shrink-0' htmlFor='date'>
          Pick a date
        </Label>
        <CalendarRange />
      </div>
    </CardContent>
  </Card>
)
