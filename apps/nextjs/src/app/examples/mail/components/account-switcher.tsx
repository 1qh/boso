'use client'

import * as React from 'react'

import { cn } from '@a/ui'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@a/ui/select'

interface AccountSwitcherProps {
  readonly accounts: {
    email: string
    icon: React.ReactNode
    label: string
  }[]
  readonly isCollapsed: boolean
}

export const AccountSwitcher = ({ accounts, isCollapsed }: AccountSwitcherProps) => {
  const [selectedAccount, setSelectedAccount] = React.useState<string>(accounts[0]?.email ?? '')

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        aria-label='Select account'
        className={cn(
          'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:size-4 [&_svg]:shrink-0',
          isCollapsed &&
            'flex size-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
        )}>
        <SelectValue placeholder='Select an account'>
          {accounts.find(account => account.email === selectedAccount)?.icon}

          <span className={cn('ml-2', isCollapsed && 'hidden')}>
            {accounts.find(account => account.email === selectedAccount)?.label}
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {accounts.map(account => (
          <SelectItem key={account.email} value={account.email}>
            <div className='flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground'>
              {account.icon}

              {account.email}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
