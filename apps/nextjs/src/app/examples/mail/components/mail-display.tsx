import { addDays, addHours, format, nextSaturday } from 'date-fns'
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'
import { Button } from '@a/ui/button'
import { Calendar } from '@a/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@a/ui/dropdown-menu'
import { Label } from '@a/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'
import { Separator } from '@a/ui/separator'
import { Switch } from '@a/ui/switch'
import { Textarea } from '@a/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@a/ui/tooltip'

import type { Mail } from '../data'

interface MailDisplayProps {
  readonly mail: Mail | null
}

export const MailDisplay = ({ mail }: MailDisplayProps) => {
  const today = new Date()

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center p-2'>
        <div className='flex items-center gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={!mail} size='icon' variant='ghost'>
                <Archive className='size-4' />

                <span className='sr-only'>Archive</span>
              </Button>
            </TooltipTrigger>

            <TooltipContent>Archive</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={!mail} size='icon' variant='ghost'>
                <ArchiveX className='size-4' />

                <span className='sr-only'>Move to junk</span>
              </Button>
            </TooltipTrigger>

            <TooltipContent>Move to junk</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={!mail} size='icon' variant='ghost'>
                <Trash2 className='size-4' />

                <span className='sr-only'>Move to trash</span>
              </Button>
            </TooltipTrigger>

            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>

          <Separator className='mx-1 h-6' orientation='vertical' />

          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button disabled={!mail} size='icon' variant='ghost'>
                    <Clock className='size-4' />

                    <span className='sr-only'>Snooze</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>

              <PopoverContent className='flex w-fit p-0'>
                <div className='flex flex-col gap-2 border-r px-2 py-4'>
                  <div className='px-4 text-sm font-medium'>Snooze until</div>

                  <div className='grid min-w-[250px] gap-1'>
                    <Button className='justify-start font-normal' variant='ghost'>
                      Later today{' '}
                      <span className='ml-auto text-muted-foreground'>
                        {format(addHours(today, 4), 'E, h:m b')}
                      </span>
                    </Button>

                    <Button className='justify-start font-normal' variant='ghost'>
                      Tomorrow
                      <span className='ml-auto text-muted-foreground'>
                        {format(addDays(today, 1), 'E, h:m b')}
                      </span>
                    </Button>

                    <Button className='justify-start font-normal' variant='ghost'>
                      This weekend
                      <span className='ml-auto text-muted-foreground'>
                        {format(nextSaturday(today), 'E, h:m b')}
                      </span>
                    </Button>

                    <Button className='justify-start font-normal' variant='ghost'>
                      Next week
                      <span className='ml-auto text-muted-foreground'>
                        {format(addDays(today, 7), 'E, h:m b')}
                      </span>
                    </Button>
                  </div>
                </div>

                <Calendar />
              </PopoverContent>
            </Popover>

            <TooltipContent>Snooze</TooltipContent>
          </Tooltip>
        </div>

        <div className='ml-auto flex items-center gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={!mail} size='icon' variant='ghost'>
                <Reply className='size-4' />

                <span className='sr-only'>Reply</span>
              </Button>
            </TooltipTrigger>

            <TooltipContent>Reply</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={!mail} size='icon' variant='ghost'>
                <ReplyAll className='size-4' />

                <span className='sr-only'>Reply all</span>
              </Button>
            </TooltipTrigger>

            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={!mail} size='icon' variant='ghost'>
                <Forward className='size-4' />

                <span className='sr-only'>Forward</span>
              </Button>
            </TooltipTrigger>

            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>

        <Separator className='mx-2 h-6' orientation='vertical' />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={!mail} size='icon' variant='ghost'>
              <MoreVertical className='size-4' />

              <span className='sr-only'>More</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>

            <DropdownMenuItem>Star thread</DropdownMenuItem>

            <DropdownMenuItem>Add label</DropdownMenuItem>

            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />

      {mail ? (
        <div className='flex flex-1 flex-col'>
          <div className='flex items-start p-4'>
            <div className='flex items-start gap-4 text-sm'>
              <Avatar>
                <AvatarImage alt={mail.name} />

                <AvatarFallback>
                  {mail.name
                    .split(' ')
                    .map(chunk => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <div className='grid gap-1'>
                <div className='font-semibold'>{mail.name}</div>

                <div className='line-clamp-1 text-xs'>{mail.subject}</div>

                <div className='line-clamp-1 text-xs'>
                  <span className='font-medium'>Reply-To:</span> {mail.email}
                </div>
              </div>
            </div>

            {mail.date ? (
              <div className='ml-auto text-xs text-muted-foreground'>
                {format(new Date(mail.date), 'PPpp')}
              </div>
            ) : null}
          </div>

          <Separator />

          <div className='flex-1 whitespace-pre-wrap p-4 text-sm'>{mail.text}</div>

          <Separator className='mt-auto' />

          <div className='p-4'>
            <form>
              <div className='grid gap-4'>
                <Textarea className='p-4' placeholder={`Reply ${mail.name}...`} />

                <div className='flex items-center'>
                  <Label className='flex items-center gap-2 text-xs font-normal' htmlFor='mute'>
                    <Switch aria-label='Mute thread' id='mute' /> Mute this thread
                  </Label>

                  <Button className='ml-auto' onClick={e => e.preventDefault()} size='sm'>
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className='p-8 text-center text-muted-foreground'>No message selected</div>
      )}
    </div>
  )
}
