'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'
import { Button } from '@a/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@a/ui/card'
import { Input } from '@a/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@a/ui/select'
import { Separator } from '@a/ui/separator'

export const DemoShareDocument = () => (
  <Card>
    <CardHeader>
      <CardTitle>Share this document</CardTitle>

      <CardDescription>Anyone with the link can view this document.</CardDescription>
    </CardHeader>

    <CardContent>
      <div className='flex space-x-2'>
        <Input readOnly value='http://example.com/link/to/document' />

        <Button className='shrink-0' variant='secondary'>
          Copy Link
        </Button>
      </div>

      <Separator className='my-4' />

      <div className='space-y-4'>
        <h4 className='text-sm font-medium'>People with access</h4>

        <div className='grid gap-6'>
          <div className='flex items-center justify-between space-x-4'>
            <div className='flex items-center space-x-4'>
              <Avatar>
                <AvatarImage src='/avatars/03.png' />

                <AvatarFallback>OM</AvatarFallback>
              </Avatar>

              <div>
                <p className='text-sm font-medium leading-none'>Olivia Martin</p>

                <p className='text-sm text-muted-foreground'>m@example.com</p>
              </div>
            </div>

            <Select defaultValue='edit'>
              <SelectTrigger className='ml-auto w-[110px]'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='edit'>Can edit</SelectItem>

                <SelectItem value='view'>Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center justify-between space-x-4'>
            <div className='flex items-center space-x-4'>
              <Avatar>
                <AvatarImage src='/avatars/05.png' />

                <AvatarFallback>IN</AvatarFallback>
              </Avatar>

              <div>
                <p className='text-sm font-medium leading-none'>Isabella Nguyen</p>

                <p className='text-sm text-muted-foreground'>b@example.com</p>
              </div>
            </div>

            <Select defaultValue='view'>
              <SelectTrigger className='ml-auto w-[110px]'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='edit'>Can edit</SelectItem>

                <SelectItem value='view'>Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center justify-between space-x-4'>
            <div className='flex items-center space-x-4'>
              <Avatar>
                <AvatarImage src='/avatars/01.png' />

                <AvatarFallback>SD</AvatarFallback>
              </Avatar>

              <div>
                <p className='text-sm font-medium leading-none'>Sofia Davis</p>

                <p className='text-sm text-muted-foreground'>p@example.com</p>
              </div>
            </div>

            <Select defaultValue='view'>
              <SelectTrigger className='ml-auto w-[110px]'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='edit'>Can edit</SelectItem>

                <SelectItem value='view'>Can view</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)
