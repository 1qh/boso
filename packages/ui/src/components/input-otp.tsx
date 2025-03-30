'use client'

import { cn } from '@a/ui'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import * as React from 'react'

const InputOTP = ({
    className,
    containerClassName,
    ...props
  }: React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string
  }) => (
    <OTPInput
      className={cn('disabled:cursor-not-allowed', className)}
      containerClassName={cn('flex gap-2 has-disabled:opacity-50 items-center', containerClassName)}
      data-slot='input-otp'
      {...props}
    />
  ),
  InputOTPGroup = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div className={cn('flex items-center', className)} data-slot='input-otp-group' {...props} />
  ),
  InputOTPSlot = ({
    className,
    index,
    ...props
  }: React.ComponentProps<'div'> & {
    index: number
  }) => {
    const inputOTPContext = React.useContext(OTPInputContext),
      { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {}
    return (
      <div
        className={cn(
          'aria-invalid:border-destructive border-input border-r border-y dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:z-10 first:border-l first:rounded-l-md flex h-9 items-center justify-center last:rounded-r-md outline-none relative shadow-xs text-sm transition-all w-9',
          className
        )}
        data-active={isActive}
        data-slot='input-otp-slot'
        {...props}>
        {char}
        {hasFakeCaret ? (
          <div className='absolute flex inset-0 items-center justify-center pointer-events-none'>
            <div className='animate-caret-blink bg-foreground duration-1000 h-4 w-px' />
          </div>
        ) : null}
      </div>
    )
  },
  InputOTPSeparator = ({ ...props }: React.ComponentProps<'div'>) => (
    <div data-slot='input-otp-separator' role='separator' {...props}>
      <MinusIcon />
    </div>
  )

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
