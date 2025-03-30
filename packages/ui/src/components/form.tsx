'use client'

import type * as LabelPrimitive from '@radix-ui/react-label'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

import { cn } from '@a/ui'
import { Label } from '@a/ui/label'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { Controller, FormProvider, useFormContext, useFormState } from 'react-hook-form'

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
}
interface FormItemContextValue {
  id: string
}

const Form = FormProvider,
  FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue),
  FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue),
  FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >({
    ...props
  }: ControllerProps<TFieldValues, TName>) => (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  ),
  useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext),
      itemContext = React.useContext(FormItemContext),
      { getFieldState } = useFormContext(),
      formState = useFormState({ name: fieldContext.name }),
      fieldState = getFieldState(fieldContext.name, formState)
    if (!fieldContext.name) throw new Error('useFormField should be used within <FormField>')
    const { id } = itemContext
    return {
      formDescriptionId: `${id}-form-item-description`,
      formItemId: `${id}-form-item`,
      formMessageId: `${id}-form-item-message`,
      id,
      name: fieldContext.name,
      ...fieldState
    }
  },
  FormItem = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const id = React.useId()
    return (
      <FormItemContext.Provider value={{ id }}>
        <div className={cn('gap-2 grid', className)} data-slot='form-item' {...props} />
      </FormItemContext.Provider>
    )
  },
  FormLabel = ({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) => {
    const { error, formItemId } = useFormField()
    return (
      <Label
        className={cn('data-[error=true]:text-destructive', className)}
        data-error={Boolean(error)}
        data-slot='form-label'
        htmlFor={formItemId}
        {...props}
      />
    )
  },
  FormControl = ({ ...props }: React.ComponentProps<typeof Slot>) => {
    const { error, formDescriptionId, formItemId, formMessageId } = useFormField()
    return (
      <Slot
        aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
        aria-invalid={Boolean(error)}
        data-slot='form-control'
        id={formItemId}
        {...props}
      />
    )
  },
  FormDescription = ({ className, ...props }: React.ComponentProps<'p'>) => {
    const { formDescriptionId } = useFormField()
    return (
      <p
        className={cn('text-muted-foreground text-sm', className)}
        data-slot='form-description'
        id={formDescriptionId}
        {...props}
      />
    )
  },
  FormMessage = ({ className, ...props }: React.ComponentProps<'p'>) => {
    const { error, formMessageId } = useFormField(),
      body = error ? String(error.message ?? '') : props.children
    if (!body) return null
    return (
      <p className={cn('text-destructive text-sm', className)} data-slot='form-message' id={formMessageId} {...props}>
        {body}
      </p>
    )
  }

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField }
