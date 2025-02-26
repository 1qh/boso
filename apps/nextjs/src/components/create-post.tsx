'use client'

import { Send } from 'lucide-react'
import { toast } from 'sonner'

import { CreatePostSchema } from '@a/db/schema'
import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@a/ui/form'
import { Input } from '@a/ui/input'

import useForm from '~/hook/use-form'
import { api } from '~/trpc/react'

export default function CreatePost() {
  const form = useForm({
      defaultValues: { content: '', title: '' },
      schema: CreatePostSchema
    }),
    utils = api.useUtils(),
    createPost = api.post.create.useMutation({
      onError: err =>
        toast.error(err.data?.code === 'UNAUTHORIZED' ? 'Log in to post' : 'Failed to create post'),
      onSuccess: async () => {
        form.reset()
        await utils.post.invalidate()
      }
    })
  return (
    <Form {...form}>
      <form
        className='mt-3 flex gap-2.5'
        onSubmit={form.handleSubmit(data => createPost.mutate(data))}>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='Title' />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder='Content' />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={cn(
            'transition-all duration-700',
            createPost.isPending &&
              'animate-spin rounded-3xl border-2 border-foreground border-t-transparent text-foreground *:stroke-none'
          )}
          size='icon'
          variant='outline'>
          <Send />
        </Button>
      </form>
    </Form>
  )
}
