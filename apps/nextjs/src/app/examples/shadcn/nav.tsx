'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@a/ui'

const examples = [
  {
    href: '/examples',
    name: 'Home'
  },
  {
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/mail',
    href: '/examples/mail',
    name: 'Mail'
  },
  {
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/dashboard',
    href: '/examples/dashboard',
    name: 'Dashboard'
  },
  {
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/cards',
    href: '/examples/cards',
    name: 'Cards'
  },
  {
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/tasks',
    href: '/examples/tasks',
    name: 'Tasks'
  },
  {
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/playground',
    href: '/examples/playground',
    name: 'Playground'
  },
  {
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/forms',
    href: '/examples/forms',
    name: 'Forms'
  },
  {
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/music',
    href: '/examples/music',
    name: 'Music'
  },
  {
    code: 'https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/authentication',
    href: '/examples/authentication',
    name: 'Authentication'
  }
]

export default function ExamplesNav() {
  const pathname = usePathname()

  return examples.map((ex, i) => (
    <Link
      className={cn(
        'rounded-full py-1 text-sm tracking-tight transition-all duration-300 hover:text-primary',
        pathname === ex.href || (pathname.startsWith(ex.href) && i !== 0)
          ? 'bg-muted px-5 font-semibold text-primary'
          : 'px-2 text-muted-foreground'
      )}
      href={ex.href}
      key={ex.href}>
      {ex.name}
    </Link>
  ))
}
