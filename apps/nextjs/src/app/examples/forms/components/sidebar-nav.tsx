'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@a/ui'
import { buttonVariants } from '@a/ui/button'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  readonly items: {
    href: string
    title: string
  }[]
}

export const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const pathname = usePathname()

  return (
    <nav
      className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
      {...props}>
      {items.map(item => (
        <Link
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
          href={item.href}
          key={item.href}>
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
