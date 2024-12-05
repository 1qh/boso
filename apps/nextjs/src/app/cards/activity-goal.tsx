'use client'

import * as React from 'react'
import { Minus, Plus } from 'lucide-react'
import { Bar, BarChart } from 'recharts'

import type { ChartConfig } from '@a/ui/chart'
import { Button } from '@a/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { ChartContainer } from '@a/ui/chart'

const data = [
    { goal: 400 },
    { goal: 300 },
    { goal: 200 },
    { goal: 300 },
    { goal: 200 },
    { goal: 278 },
    { goal: 189 },
    { goal: 239 },
    { goal: 300 },
    { goal: 200 },
    { goal: 278 },
    { goal: 189 },
    { goal: 349 }
  ],
  chartConfig = {
    goal: {
      label: 'Goal',
      theme: {
        dark: 'white',
        light: 'black'
      }
    }
  } satisfies ChartConfig,
  CardsActivityGoal = () => {
    const [goal, setGoal] = React.useState(350),
      onClick = (adjustment: number) => {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
      }

    return (
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle>Move Goal</CardTitle>
          <CardDescription>Set your daily activity goal.</CardDescription>
        </CardHeader>
        <CardContent className='pb-2'>
          <div className='flex items-center justify-center space-x-2'>
            <Button
              className='size-8 shrink-0 rounded-full'
              disabled={goal <= 200}
              onClick={() => onClick(-10)}
              size='icon'
              variant='outline'>
              <Minus />
              <span className='sr-only'>Decrease</span>
            </Button>
            <div className='flex-1 text-center'>
              <div className='text-5xl font-bold tracking-tighter'>{goal}</div>
              <div className='text-[0.70rem] uppercase text-muted-foreground'>Calories/day</div>
            </div>
            <Button
              className='size-8 shrink-0 rounded-full'
              disabled={goal >= 400}
              onClick={() => onClick(10)}
              size='icon'
              variant='outline'>
              <Plus />
              <span className='sr-only'>Increase</span>
            </Button>
          </div>
          <div className='my-3 h-[60px]'>
            <ChartContainer className='aspect-auto size-full' config={chartConfig}>
              <BarChart data={data}>
                <Bar dataKey='goal' fill='var(--color-goal)' radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Set Goal</Button>
        </CardFooter>
      </Card>
    )
  }

export { CardsActivityGoal }
