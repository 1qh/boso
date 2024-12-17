'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { Minus } from 'lucide-react'

import { cn } from '@a/ui'

const InputOTP = React.forwardRef<
    React.ComponentRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput>
  >(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      className={cn('disabled:cursor-not-allowed', className)}
      containerClassName={cn(
        'flex items-center gap-2 has-[:disabled]:opacity-50',
        containerClassName
      )}
      ref={ref}
      {...props}
    />
  )),
  InputOTPGroup = React.forwardRef<
    React.ComponentRef<'div'>,
    React.ComponentPropsWithoutRef<'div'>
  >(({ className, ...props }, ref) => (
    <div className={cn('flex items-center', className)} ref={ref} {...props} />
  )),
  InputOTPSlot = React.forwardRef<
    React.ComponentRef<'div'>,
    React.ComponentPropsWithoutRef<'div'> & { readonly index: number }
  >(({ className, index, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext),
      { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {}

    return (
      <div
        className={cn(
          'relative flex size-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
          isActive && 'z-10 ring-1 ring-ring',
          className
        )}
        ref={ref}
        {...props}>
        {char}
        {hasFakeCaret ? (
          <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
            <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
          </div>
        ) : null}
      </div>
    )
  }),
  InputOTPSeparator = React.forwardRef<
    React.ComponentRef<'div'>,
    React.ComponentPropsWithoutRef<'div'>
  >(({ ...props }, ref) => (
    <div ref={ref} role='separator' {...props}>
      <Minus />
    </div>
  ))

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
InputOTP.displayName = 'InputOTP'
InputOTPGroup.displayName = 'InputOTPGroup'
InputOTPSeparator.displayName = 'InputOTPSeparator'
InputOTPSlot.displayName = 'InputOTPSlot'
