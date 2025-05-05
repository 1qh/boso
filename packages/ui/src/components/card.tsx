import { cn } from '@a/ui'
import * as React from 'react'

const Card = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('bg-card border flex flex-col gap-6 py-6 rounded-xl shadow-sm text-card-foreground', className)}
      data-slot='card'
      {...props}
    />
  ),
  CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn(
        '[.border-b]:pb-6 @container/card-header auto-rows-min gap-1.5 grid grid-rows-[auto_auto] has-data-[slot=card-action]:grid-cols-[1fr_auto] items-start px-6',
        className
      )}
      data-slot='card-header'
      {...props}
    />
  ),
  CardTitle = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('font-semibold leading-none', className)} data-slot='card-title' {...props} />
  ),
  CardDescription = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('text-muted-foreground text-sm', className)} data-slot='card-description' {...props} />
  ),
  CardAction = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('col-start-2 justify-self-end row-span-2 row-start-1 self-start', className)}
      data-slot='card-action'
      {...props}
    />
  ),
  CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('px-6', className)} data-slot='card-content' {...props} />
  ),
  CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('[.border-t]:pt-6 flex items-center px-6', className)} data-slot='card-footer' {...props} />
  )

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
