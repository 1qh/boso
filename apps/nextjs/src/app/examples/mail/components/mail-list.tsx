import type { ComponentProps } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { cn } from '@a/ui'
import { Badge } from '@a/ui/badge'
import { ScrollArea } from '@a/ui/scroll-area'

import type { Mail } from '../data'
import { useMail } from '../use-mail'

interface MailListProps {
  readonly items: Mail[]
}

const getBadgeVariantFromLabel = (label: string): ComponentProps<typeof Badge>['variant'] => {
    if (['work'].includes(label.toLowerCase())) {
      return 'default'
    }
    if (['personal'].includes(label.toLowerCase())) {
      return 'outline'
    }
    return 'secondary'
  },
  MailList = ({ items }: MailListProps) => {
    const [mail, setMail] = useMail()

    return (
      <ScrollArea className='h-[calc(100vh-9.1rem)]'>
        <div className='flex flex-col gap-2 p-4 pt-0'>
          {items.map(item => (
            <button
              className={cn(
                'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                mail.selected === item.id && 'bg-muted'
              )}
              key={item.id}
              onClick={() => setMail({ ...mail, selected: item.id })}>
              <div className='flex w-full flex-col gap-1'>
                <div className='flex items-center'>
                  <div className='flex items-center gap-2'>
                    <div className='font-semibold'>{item.name}</div>
                    {!item.read && <span className='flex size-2 rounded-full bg-blue-600' />}
                  </div>

                  <div
                    className={cn(
                      'ml-auto text-xs',
                      mail.selected === item.id ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                    {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true
                    })}
                  </div>
                </div>

                <div className='text-xs font-medium'>{item.subject}</div>
              </div>

              <div className='line-clamp-2 text-xs text-muted-foreground'>
                {item.text.substring(0, 300)}
              </div>

              {item.labels.length ? (
                <div className='flex items-center gap-2'>
                  {item.labels.map(label => (
                    <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                      {label}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </ScrollArea>
    )
  }

export { MailList }
