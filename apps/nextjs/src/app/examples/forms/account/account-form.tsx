'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Calendar } from '@a/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@a/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@a/ui/form'
import { Input } from '@a/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'

type AccountFormValues = z.infer<typeof accountFormSchema>

const languages = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese', value: 'zh' }
  ] as const,
  accountFormSchema = z.object({
    dob: z
      .date({
        required_error: 'A date of birth is required.'
      })
      .optional(),
    language: z.string({
      required_error: 'Please select a language.'
    }),
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters.'
      })
      .max(30, {
        message: 'Name must not be longer than 30 characters.'
      })
  }),
  // This can come from your database or API.
  defaultValues: Partial<AccountFormValues> = {
    // Name: "Your name",
    // Dob: new Date("2023-01-23"),
  },
  AccountForm = () => {
    const form = useForm<AccountFormValues>({
        defaultValues,
        resolver: zodResolver(accountFormSchema)
      }),
      onSubmit = (data: AccountFormValues) => {
        toast(
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      }

    return (
      <Form {...form}>
        <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input placeholder='Your name' {...field} />
                </FormControl>

                <FormDescription>
                  This is the name that will be displayed on your profile and in emails.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dob'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Date of birth</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value?.getTime() && 'text-muted-foreground'
                        )}
                        variant='outline'>
                        {field.value?.getTime() ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}

                        <CalendarIcon className='ml-auto size-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent align='start' className='w-auto p-0'>
                    <Calendar
                      autoFocus
                      disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      mode='single'
                      onSelect={field.onChange}
                      selected={field.value}
                    />
                  </PopoverContent>
                </Popover>

                <FormDescription>Your date of birth is used to calculate your age.</FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='language'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Language</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                        role='combobox'
                        variant='outline'>
                        {field.value
                          ? languages.find(language => language.value === field.value)?.label
                          : 'Select language'}

                        <CaretSortIcon className='ml-2 size-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Search language...' />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map(language => (
                            <CommandItem
                              key={language.value}
                              onSelect={() => {
                                form.setValue('language', language.value)
                              }}
                              value={language.label}>
                              <CheckIcon
                                className={cn(
                                  'mr-2 size-4',
                                  language.value === field.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />

                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormDescription>
                  This is the language that will be used in the dashboard.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Update account</Button>
        </form>
      </Form>
    )
  }

export { AccountForm }
