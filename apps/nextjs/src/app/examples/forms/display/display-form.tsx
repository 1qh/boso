'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@a/ui/button'
import { Checkbox } from '@a/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@a/ui/form'

type DisplayFormValues = z.infer<typeof displayFormSchema>

const items = [
    {
      id: 'recents',
      label: 'Recents'
    },
    {
      id: 'home',
      label: 'Home'
    },
    {
      id: 'applications',
      label: 'Applications'
    },
    {
      id: 'desktop',
      label: 'Desktop'
    },
    {
      id: 'downloads',
      label: 'Downloads'
    },
    {
      id: 'documents',
      label: 'Documents'
    }
  ] as const,
  displayFormSchema = z.object({
    items: z.array(z.string()).refine(value => value.some(item => item), {
      message: 'You have to select at least one item.'
    })
  }),
  // This can come from your database or API.
  defaultValues: Partial<DisplayFormValues> = {
    items: ['recents', 'home']
  },
  DisplayForm = () => {
    const form = useForm<DisplayFormValues>({
        defaultValues,
        resolver: zodResolver(displayFormSchema)
      }),
      onSubmit = (data: DisplayFormValues) => {
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
            name='items'
            render={() => (
              <FormItem>
                <div className='mb-4'>
                  <FormLabel className='text-base'>Sidebar</FormLabel>

                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>

                {items.map(item => (
                  <FormField
                    control={form.control}
                    key={item.id}
                    name='items'
                    render={({ field }) => (
                      <FormItem
                        className='flex flex-row items-start space-x-3 space-y-0'
                        key={item.id}>
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(item.id)}
                            onCheckedChange={checked =>
                              checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value.filter(value => value !== item.id))
                            }
                          />
                        </FormControl>

                        <FormLabel className='font-normal'>{item.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Update display</Button>
        </form>
      </Form>
    )
  }

export { DisplayForm }
