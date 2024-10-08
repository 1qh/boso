'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Search } from 'lucide-react'

import { cn } from '@a/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@a/ui/avatar'
import { Input } from '@a/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@a/ui/resizable'
import { Switch } from '@a/ui/switch'
import { TooltipProvider } from '@a/ui/tooltip'

import mails from './data'

const Page = () => {
  const [id, setId] = useState(''),
    [search, setSearch] = useState(''),
    [unread, setUnread] = useState(false),
    mail = mails.find(m => m.id === id)

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup className='items-stretch' direction='horizontal'>
        <ResizablePanel defaultSize={30}>
          <div className='flex items-center gap-2 border-r border-dashed px-2 pb-0.5 pt-1'>
            <div className='relative grow'>
              <Search className='absolute left-2 top-2.5 size-4 text-muted-foreground' />
              <Input
                className='pl-8'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search'
                value={search}
              />
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
          <div className='h-[calc(100vh-4.2rem)] overflow-y-auto'>
            {mails
              .filter(m => (unread ? !m.read.length : true))
              .filter(m => m.company.toLowerCase().includes(search.toLowerCase()))
              .map(m => (
                <button
                  className={cn(
                    'flex flex-col items-start border-r border-dashed p-3 pr-1.5 text-left text-sm transition-all duration-300 hover:bg-accent',
                    id === m.id && 'border-solid border-foreground bg-muted'
                  )}
                  key={m.id}
                  onClick={() => setId(m.id)}>
                  <p className='flex items-center gap-2 font-semibold'>
                    {m.company}
                    {!m.read.length && <span className='size-2.5 rounded-full bg-blue-600' />}
                  </p>
                  <p className='text-xs font-medium'>{m.subject}</p>
                  <p className='mt-1 line-clamp-2 text-xs text-muted-foreground'>{m.text}</p>
                </button>
              ))}
          </div>
        </ResizablePanel>
        <ResizableHandle className='w-0.5 bg-transparent' />
        <ResizablePanel className='flex flex-col divide-y divide-dashed *:px-4 *:py-3'>
          {mail ? (
            <>
              <div className='flex items-center gap-4 text-xs'>
                <Avatar className='size-12'>
                  <AvatarImage alt={mail.company} />
                  <AvatarFallback>
                    {mail.company
                      .split(' ')
                      .map(chunk => chunk[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className='space-y-0.5'>
                  <p className='flex items-center gap-1.5'>
                    <span className='text-sm font-semibold'>{mail.employee ?? mail.company}</span>
                    <span className='text-xs text-muted-foreground'>
                      {mail.employee ? `at ${mail.company}` : null}
                    </span>
                  </p>
                  <p className='line-clamp-1'>{mail.subject}</p>
                  <p className='line-clamp-1 text-muted-foreground'>{mail.email}</p>
                </div>
                {mail.read.length ? (
                  <p className='ml-auto text-xs text-muted-foreground'>
                    {`Last opened at ${format(new Date(mail.read.slice(-1)[0] ?? ''), 'PPpp')}`}
                  </p>
                ) : null}
              </div>
              <div className='whitespace-pre-wrap text-sm'>{mail.text}</div>
            </>
          ) : (
            <p className='m-auto text-3xl text-input'>Select a mail</p>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default Page
