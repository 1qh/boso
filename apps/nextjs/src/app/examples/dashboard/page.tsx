import type { Metadata } from 'next'
import Image from 'next/image'

import { Button } from '@a/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@a/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@a/ui/tabs'

import CalendarRange from '../calendar-range'
import { MainNav } from './components/main-nav'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import { Search } from './components/search'
import TeamSwitcher from './components/team-switcher'
import { UserNav } from './components/user-nav'

export const metadata: Metadata = {
  description: 'Example dashboard app built using the components.',
  title: 'Dashboard'
}

export default function DashboardPage() {
  return (
    <>
      <div className='md:hidden'>
        <Image
          alt='Dashboard'
          className='block dark:hidden'
          height={866}
          src='/examples/dashboard-light.png'
          width={1280}
        />

        <Image
          alt='Dashboard'
          className='hidden dark:block'
          height={866}
          src='/examples/dashboard-dark.png'
          width={1280}
        />
      </div>

      <div className='hidden flex-col md:flex'>
        <div className='border-b'>
          <div className='flex h-16 items-center px-4'>
            <TeamSwitcher />

            <MainNav className='mx-6' />

            <div className='ml-auto flex items-center space-x-4'>
              <Search />

              <UserNav />
            </div>
          </div>
        </div>

        <div className='flex-1 space-y-4 p-8 pt-6'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>

            <div className='flex items-center space-x-2'>
              <CalendarRange />

              <Button>Download</Button>
            </div>
          </div>

          <Tabs className='space-y-4' defaultValue='overview'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>

              <TabsTrigger disabled value='analytics'>
                Analytics
              </TabsTrigger>

              <TabsTrigger disabled value='reports'>
                Reports
              </TabsTrigger>

              <TabsTrigger disabled value='notifications'>
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent className='space-y-4' value='overview'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>

                    <svg
                      className='size-4 text-muted-foreground'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                    </svg>
                  </CardHeader>

                  <CardContent>
                    <div className='text-2xl font-bold'>$45,231.89</div>

                    <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Subscriptions</CardTitle>

                    <svg
                      className='size-4 text-muted-foreground'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />

                      <circle cx='9' cy='7' r='4' />

                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                  </CardHeader>

                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>

                    <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Sales</CardTitle>

                    <svg
                      className='size-4 text-muted-foreground'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <rect height='14' rx='2' width='20' x='2' y='5' />

                      <path d='M2 10h20' />
                    </svg>
                  </CardHeader>

                  <CardContent>
                    <div className='text-2xl font-bold'>+12,234</div>

                    <p className='text-xs text-muted-foreground'>+19% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Active Now</CardTitle>

                    <svg
                      className='size-4 text-muted-foreground'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
                  </CardHeader>

                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>

                    <p className='text-xs text-muted-foreground'>+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>

              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                <Card className='col-span-4'>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>

                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>

                <Card className='col-span-3'>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>

                    <CardDescription>You made 265 sales this month.</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
