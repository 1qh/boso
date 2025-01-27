'use client'

import { Line, LineChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@a/ui/chart'

const data = [
    { average: 400, today: 240 },
    { average: 300, today: 139 },
    { average: 200, today: 980 },
    { average: 278, today: 390 },
    { average: 189, today: 480 },
    { average: 239, today: 380 },
    { average: 349, today: 430 }
  ],
  chartConfig = {
    average: {
      color: 'hsl(var(--muted-foreground))',
      label: 'Average'
    },
    today: {
      color: 'hsl(var(--primary))',
      label: 'Today'
    }
  } satisfies ChartConfig,
  CardsMetric = () => (
    <Card>
      <CardHeader>
        <CardTitle>Exercise Minutes</CardTitle>
        <CardDescription>
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent className='pb-4'>
        <ChartContainer className='h-[200px] w-full' config={chartConfig}>
          <LineChart
            data={data}
            margin={{
              bottom: 0,
              left: 10,
              right: 10,
              top: 5
            }}>
            <Line
              activeDot={{
                fill: 'var(--color-average)',
                r: 6
              }}
              dataKey='average'
              stroke='var(--color-average)'
              strokeWidth={2}
              type='monotone'
            />
            <Line
              activeDot={{
                r: 8,
                style: { fill: 'var(--color-today)' }
              }}
              dataKey='today'
              stroke='var(--color-today)'
              strokeWidth={2}
              type='monotone'
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )

export { CardsMetric }
