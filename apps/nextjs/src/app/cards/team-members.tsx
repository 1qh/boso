'use client'

import { ChevronDown } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'
import { Button } from '@a/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@a/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@a/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'

export const CardsTeamMembers = () => (
  <Card>
    <CardHeader>
      <CardTitle>Team Members</CardTitle>
      <CardDescription>Invite your team members to collaborate.</CardDescription>
    </CardHeader>
    <CardContent className='grid gap-6'>
      <div className='flex items-center justify-between space-x-4'>
        <div className='flex items-center space-x-4'>
          <Avatar className='size-8'>
            <AvatarImage alt='Image' src='/avatars/01.png' />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium leading-none'>Sofia Davis</p>
            <p className='text-sm text-muted-foreground'>m@example.com</p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className='ml-auto' size='sm' variant='outline'>
              Owner <ChevronDown className='text-muted-foreground' />
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' className='p-0'>
            <Command>
              <CommandInput placeholder='Select new role...' />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Viewer</p>
                    <p className='text-sm text-muted-foreground'>Can view and comment.</p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Developer</p>
                    <p className='text-sm text-muted-foreground'>Can view, comment and edit.</p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Billing</p>
                    <p className='text-sm text-muted-foreground'>
                      Can view, comment and manage billing.
                    </p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Owner</p>
                    <p className='text-sm text-muted-foreground'>
                      Admin-level access to all resources.
                    </p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex items-center justify-between space-x-4'>
        <div className='flex items-center space-x-4'>
          <Avatar className='size-8'>
            <AvatarImage alt='Image' src='/avatars/02.png' />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium leading-none'>Jackson Lee</p>
            <p className='text-sm text-muted-foreground'>p@example.com</p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className='ml-auto' size='sm' variant='outline'>
              Member <ChevronDown className='text-muted-foreground' />
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' className='p-0'>
            <Command>
              <CommandInput placeholder='Select new role...' />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup className='p-1.5'>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Viewer</p>
                    <p className='text-sm text-muted-foreground'>Can view and comment.</p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Developer</p>
                    <p className='text-sm text-muted-foreground'>Can view, comment and edit.</p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Billing</p>
                    <p className='text-sm text-muted-foreground'>
                      Can view, comment and manage billing.
                    </p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Owner</p>
                    <p className='text-sm text-muted-foreground'>
                      Admin-level access to all resources.
                    </p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex items-center justify-between space-x-4'>
        <div className='flex items-center space-x-4'>
          <Avatar className='size-8'>
            <AvatarImage alt='Image' src='/avatars/03.png' />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium leading-none'>Isabella Nguyen</p>
            <p className='text-sm text-muted-foreground'>i@example.com</p>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className='ml-auto' size='sm' variant='outline'>
              Member <ChevronDown className='text-muted-foreground' />
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' className='p-0'>
            <Command>
              <CommandInput placeholder='Select new role...' />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup className='p-1.5'>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Viewer</p>
                    <p className='text-sm text-muted-foreground'>Can view and comment.</p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Developer</p>
                    <p className='text-sm text-muted-foreground'>Can view, comment and edit.</p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Billing</p>
                    <p className='text-sm text-muted-foreground'>
                      Can view, comment and manage billing.
                    </p>
                  </CommandItem>
                  <CommandItem className='teamaspace-y-1 flex flex-col items-start px-4 py-2'>
                    <p>Owner</p>
                    <p className='text-sm text-muted-foreground'>
                      Admin-level access to all resources.
                    </p>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </CardContent>
  </Card>
)
