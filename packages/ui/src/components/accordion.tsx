'use client'

import { cn } from '@a/ui'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

const Accordion = ({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) => (
    <AccordionPrimitive.Root data-slot='accordion' {...props} />
  ),
  AccordionItem = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
    <AccordionPrimitive.Item className={cn('border-b last:border-b-0', className)} data-slot='accordion-item' {...props} />
  ),
  AccordionTrigger = ({ children, className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        className={cn(
          '[&[data-state=open]>svg]:rotate-180 disabled:opacity-50 disabled:pointer-events-none flex flex-1 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 font-medium gap-4 hover:underline items-start justify-between outline-none py-4 rounded-md text-left text-sm transition-all',
          className
        )}
        data-slot='accordion-trigger'
        {...props}>
        {children}
        <ChevronDownIcon className='duration-200 pointer-events-none shrink-0 size-4 text-muted-foreground transition-transform translate-y-0.5' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
  AccordionContent = ({ children, className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
    <AccordionPrimitive.Content
      className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'
      data-slot='accordion-content'
      {...props}>
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
