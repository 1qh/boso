'use client'

import { Button } from '@a/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@a/ui/card'
import { Label } from '@a/ui/label'
import { Switch } from '@a/ui/switch'

export const DemoCookieSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Cookie Settings</CardTitle>

      <CardDescription>Manage your cookie settings here.</CardDescription>
    </CardHeader>

    <CardContent className='grid gap-6'>
      <div className='flex items-center justify-between space-x-2'>
        <Label className='flex flex-col space-y-1' htmlFor='necessary'>
          <span>Strictly Necessary</span>

          <span className='font-normal leading-snug text-muted-foreground'>
            These cookies are essential in order to use the website and use its features.
          </span>
        </Label>

        <Switch defaultChecked id='necessary' />
      </div>

      <div className='flex items-center justify-between space-x-2'>
        <Label className='flex flex-col space-y-1' htmlFor='functional'>
          <span>Functional Cookies</span>

          <span className='font-normal leading-snug text-muted-foreground'>
            These cookies allow the website to provide personalized functionality.
          </span>
        </Label>

        <Switch id='functional' />
      </div>

      <div className='flex items-center justify-between space-x-2'>
        <Label className='flex flex-col space-y-1' htmlFor='performance'>
          <span>Performance Cookies</span>

          <span className='font-normal leading-snug text-muted-foreground'>
            These cookies help to improve the performance of the website.
          </span>
        </Label>

        <Switch id='performance' />
      </div>
    </CardContent>

    <CardFooter>
      <Button className='w-full' variant='outline'>
        Save preferences
      </Button>
    </CardFooter>
  </Card>
)
