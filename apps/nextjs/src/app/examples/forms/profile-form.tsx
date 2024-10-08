'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@a/ui/select'
import { Textarea } from '@a/ui/textarea'

type ProfileFormValues = z.infer<typeof profileFormSchema>

const profileFormSchema = z.object({
    bio: z.string().max(160).min(4),
    email: z
      .string({
        required_error: 'Please select an email to display.'
      })
      .email(),
    urls: z
      .array(
        z.object({
          value: z.string().url({ message: 'Please enter a valid URL.' })
        })
      )
      .optional(),
    username: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.'
      })
      .max(30, {
        message: 'Username must not be longer than 30 characters.'
      })
  }),
  // This can come from your database or API.
  defaultValues: Partial<ProfileFormValues> = {
    bio: 'I own a computer.',
    urls: [{ value: 'https://shadcn.com' }, { value: 'http://twitter.com/shadcn' }]
  },
  ProfileForm = () => {
    const form = useForm<ProfileFormValues>({
        defaultValues,
        mode: 'onChange',
        resolver: zodResolver(profileFormSchema)
      }),
      { append, fields } = useFieldArray({
        control: form.control,
        name: 'urls'
      }),
      onSubmit = (data: ProfileFormValues) => {
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
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>

                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>

                <FormDescription>
                  This is your public display name. It can be your real name or a pseudonym. You can
                  only change this once every 30 days.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value='m@example.com'>m@example.com</SelectItem>

                    <SelectItem value='m@google.com'>m@google.com</SelectItem>

                    <SelectItem value='m@support.com'>m@support.com</SelectItem>
                  </SelectContent>
                </Select>

                <FormDescription>
                  You can manage verified email addresses in your{' '}
                  <Link href='/examples/forms'>email settings</Link>.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>

                <FormControl>
                  <Textarea
                    className='resize-none'
                    placeholder='Tell us a little bit about yourself'
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  You can <span>@mention</span> other users and organizations to link to them.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {fields.map((f, index) => (
              <FormField
                control={form.control}
                key={f.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>URLs</FormLabel>

                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              className='mt-2'
              onClick={() => append({ value: '' })}
              size='sm'
              type='button'
              variant='outline'>
              Add URL
            </Button>
          </div>

          <Button type='submit'>Update profile</Button>
        </form>
      </Form>
    )
  }

export { ProfileForm }
