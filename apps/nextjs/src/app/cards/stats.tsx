'use client'

import { Bar, BarChart, Line, LineChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Card, CardContent, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer } from '@a/ui/chart'

const data = [
    { revenue: 10400, subscription: 240 },
    { revenue: 14405, subscription: 300 },
    { revenue: 9400, subscription: 200 },
    { revenue: 8200, subscription: 278 },
    { revenue: 7000, subscription: 189 },
    { revenue: 9600, subscription: 239 },
    { revenue: 11244, subscription: 278 },
    { revenue: 26475, subscription: 189 }
  ],
  chartConfig = {
    revenue: { label: 'Revenue', theme: { dark: 'white', light: 'black' } },
    subscription: { label: 'Subscriptions', theme: { dark: 'white', light: 'black' } }
  } satisfies ChartConfig,
  CardsStats = () => (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-2'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-normal'>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent className='pb-0'>
          <div className='text-2xl font-bold'>$15,231.89</div>
          <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
          <ChartContainer className='h-[80px] w-full' config={chartConfig}>
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
                  fill: 'var(--color-revenue)',
                  r: 6
                }}
                dataKey='revenue'
                stroke='var(--color-revenue)'
                strokeWidth={2}
                type='monotone'
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-normal'>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+2350</div>
          <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
          <ChartContainer className='mt-2 h-[80px] w-full' config={chartConfig}>
            <BarChart data={data}>
              <Bar dataKey='subscription' fill='var(--color-subscription)' radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )

export { CardsStats }