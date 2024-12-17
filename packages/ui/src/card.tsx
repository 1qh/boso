import * as React from 'react'

import { cn } from '@a/ui'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
        ref={ref}
        {...props}
      />
    )
  ),
  CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn('flex flex-col space-y-1.5 p-6', className)} ref={ref} {...props} />
    )
  ),
  CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn('font-semibold leading-none tracking-tight', className)}
        ref={ref}
        {...props}
      />
    )
  ),
  CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />
    )
  ),
  CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />
    )
  ),
  CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn('flex items-center p-6 pt-0', className)} ref={ref} {...props} />
    )
  )

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
Card.displayName = 'Card'
CardContent.displayName = 'CardContent'
CardDescription.displayName = 'CardDescription'
CardFooter.displayName = 'CardFooter'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
