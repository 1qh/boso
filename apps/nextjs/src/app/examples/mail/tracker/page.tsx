'use client'

import { useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { Search } from 'lucide-react'

import { cn } from '@a/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'
import { Input } from '@a/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@a/ui/resizable'
import { ScrollArea } from '@a/ui/scroll-area'
import { Separator } from '@a/ui/separator'
import { Switch } from '@a/ui/switch'
import { TooltipProvider } from '@a/ui/tooltip'

import { mails } from '../data'

const Page = () => {
  const [id, setId] = useState(''),
    [unread, setUnread] = useState(false),
    mail = mails.find(item => item.id === id)
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup className='items-stretch' direction='horizontal'>
        <ResizablePanel defaultSize={30}>
          <div className='flex items-center gap-2 px-2 pb-0.5 pt-1'>
            <div className='relative grow'>
              <Search className='absolute left-2 top-2.5 size-4 text-muted-foreground' />
              <Input className='pl-8' placeholder='Search' />
            </div>
            <p
              className={cn(
                'text-xs text-muted-foreground transition-all duration-300',
                unread && 'font-medium text-foreground'
              )}>
              Unread
            </p>
            <Switch
              checked={unread}
              className='ml-auto'
              onCheckedChange={() => setUnread(!unread)}
            />
          </div>
          <ScrollArea className='h-[calc(100vh-4.2rem)]'>
            <div className='flex flex-col'>
              {mails
                .filter(item => (unread ? !item.read : true))
                .map(m => (
                  <button
                    className={cn(
                      'flex flex-col items-start gap-2 p-3 text-left text-sm transition-all hover:bg-accent',
                      id === m.id && 'bg-muted'
                    )}
                    key={m.id}
                    onClick={() => setId(m.id)}>
                    <div className='flex w-full flex-col gap-1'>
                      <div className='flex items-center'>
                        <div className='flex items-center gap-2'>
                          <p className='font-semibold'>{m.name}</p>
                          {!m.read && <span className='size-2.5 rounded-full bg-blue-600' />}
                        </div>
                        <p
                          className={cn(
                            'ml-auto text-xs',
                            id === m.id ? 'text-foreground' : 'text-muted-foreground'
                          )}>
                          {formatDistanceToNow(new Date(m.date), { addSuffix: true })}
                        </p>
                      </div>
                      <p className='text-xs font-medium'>{m.subject}</p>
                    </div>
                    <p className='line-clamp-2 text-xs text-muted-foreground'>{m.text}</p>
                  </button>
                ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className='flex'>
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
                    <p className='font-semibold'>{mail.name}</p>
                    <p className='line-clamp-1 text-xs'>{mail.subject}</p>
                    <p className='line-clamp-1 text-xs'>
                      <span className='font-medium'>From:</span> {mail.email}
                    </p>
                  </div>
                </div>
                {mail.date ? (
                  <p className='ml-auto text-xs text-muted-foreground'>
                    {format(new Date(mail.date), 'PPpp')}
                  </p>
                ) : null}
              </div>
              <Separator />
              <div className='whitespace-pre-wrap p-4 text-sm'>{mail.text}</div>
            </div>
          ) : (
            <p className='m-auto text-3xl text-input'>Select a mail</p>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default Page
