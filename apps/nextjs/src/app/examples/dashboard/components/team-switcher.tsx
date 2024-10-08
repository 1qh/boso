'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@a/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'
import { Button } from '@a/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@a/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@a/ui/dialog'
import { Input } from '@a/ui/input'
import { Label } from '@a/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@a/ui/select'

const groups = [
  {
    label: 'Personal Account',
    teams: [
      {
        label: 'Alicia Koch',
        value: 'personal'
      }
    ]
  },
  {
    label: 'Teams',
    teams: [
      {
        label: 'Acme Inc.',
        value: 'acme-inc'
      },
      {
        label: 'Monsters Inc.',
        value: 'monsters'
      }
    ]
  }
]

type Team = (typeof groups)[number]['teams'][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

type TeamSwitcherProps = PopoverTriggerProps

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false),
    [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false),
    [selectedTeam, setSelectedTeam] = React.useState<Team>(
      groups[0]?.teams[0] ?? { label: '', value: '' }
    )

  return (
    <Dialog onOpenChange={setShowNewTeamDialog} open={showNewTeamDialog}>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            aria-label='Select a team'
            className={cn('w-[200px] justify-between', className)}
            role='combobox'
            variant='outline'>
            <Avatar className='mr-2 size-5'>
              <AvatarImage
                alt={selectedTeam.label}
                className='grayscale'
                src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
              />

              <AvatarFallback>SC</AvatarFallback>
            </Avatar>

            {selectedTeam.label}

            <CaretSortIcon className='ml-auto size-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search team...' />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>

              {groups.map(group => (
                <CommandGroup heading={group.label} key={group.label}>
                  {group.teams.map(team => (
                    <CommandItem
                      className='text-sm'
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team)
                        setOpen(false)
                      }}>
                      <Avatar className='mr-2 size-5'>
                        <AvatarImage
                          alt={team.label}
                          className='grayscale'
                          src={`https://avatar.vercel.sh/${team.value}.png`}
                        />

                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>

                      {team.label}

                      <CheckIcon
                        className={cn(
                          'ml-auto size-4',
                          selectedTeam.value === team.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>

            <CommandSeparator />

            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}>
                    <PlusCircledIcon className='mr-2 size-5' />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>

          <DialogDescription>Add a new team to manage products and customers.</DialogDescription>
        </DialogHeader>

        <div>
          <div className='space-y-4 py-2 pb-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Team name</Label>

              <Input id='name' placeholder='Acme Inc.' />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='plan'>Subscription plan</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Select a plan' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='free'>
                    <span className='font-medium'>Free</span> -{' '}
                    <span className='text-muted-foreground'>Trial for two weeks</span>
                  </SelectItem>

                  <SelectItem value='pro'>
                    <span className='font-medium'>Pro</span> -{' '}
                    <span className='text-muted-foreground'>$9/month per user</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => setShowNewTeamDialog(false)} variant='outline'>
            Cancel
          </Button>

          <Button type='submit'>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
