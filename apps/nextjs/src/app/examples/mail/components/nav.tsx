'use client'

import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@a/ui'
import { buttonVariants } from '@a/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@a/ui/tooltip'

interface NavProps {
  readonly isCollapsed: boolean
  readonly links: {
    icon: LucideIcon
    label?: string
    title: string
    variant: 'default' | 'ghost'
  }[]
}

export const Nav = ({ isCollapsed, links }: NavProps) => (
  <div
    className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'
    data-collapsed={isCollapsed}>
    <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
      {links.map((link, index) =>
        isCollapsed ? (
          <Tooltip delayDuration={0} key={index}>
            <TooltipTrigger asChild>
              <Link
                className={cn(
                  buttonVariants({ size: 'icon', variant: link.variant }),
                  'size-9',
                  link.variant === 'default' &&
                    'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                )}
                href='#'>
                <link.icon className='size-4' />

                <span className='sr-only'>{link.title}</span>
              </Link>
            </TooltipTrigger>

            <TooltipContent className='flex items-center gap-4' side='right'>
              {link.title}

              {link.label ? (
                <span className='ml-auto text-muted-foreground'>{link.label}</span>
              ) : null}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            className={cn(
              buttonVariants({ size: 'sm', variant: link.variant }),
              link.variant === 'default' &&
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start'
            )}
            href='#'
            key={index}>
            <link.icon className='mr-2 size-4' />

            {link.title}

            {link.label ? (
              <span
                className={cn(
                  'ml-auto',
                  link.variant === 'default' && 'text-background dark:text-white'
                )}>
                {link.label}
              </span>
            ) : null}
          </Link>
        )
      )}
    </nav>
  </div>
)
