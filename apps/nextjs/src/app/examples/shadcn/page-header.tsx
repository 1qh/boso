import Balance from 'react-wrap-balancer'

import { cn } from '@a/ui'

const PageActions = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn('flex w-full items-center justify-center space-x-4 py-4 md:pb-10', className)}
      {...props}
    />
  ),
  PageHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <section
      className={cn(
        'mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20',
        className
      )}
      {...props}>
      {children}
    </section>
  ),
  PageHeaderDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Balance
      className={cn('max-w-[750px] text-center text-lg font-light text-foreground', className)}
      {...props}
    />
  ),
  PageHeaderHeading = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]',
        className
      )}
      {...props}
    />
  )

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading }
