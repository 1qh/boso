import Link from 'next/link'

import { cn } from '@a/ui'

export const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
    <Link
      className='text-sm font-medium transition-colors hover:text-primary'
      href='/examples/dashboard'>
      Overview
    </Link>

    <Link
      className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      href='/examples/dashboard'>
      Customers
    </Link>

    <Link
      className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      href='/examples/dashboard'>
      Products
    </Link>

    <Link
      className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      href='/examples/dashboard'>
      Settings
    </Link>
  </nav>
)
