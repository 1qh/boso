'use client'

import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

import { CreatePostSchema } from '@a/db/schema'
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
        className='mt-3 flex gap-3'
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

        <Button size='icon' variant='ghost'>
          {createPost.isPending ? (
            <p className='size-6 animate-spin rounded-full border-2 border-foreground border-t-transparent' />
          ) : (
            <PaperPlaneIcon className='size-6' />
          )}
        </Button>
      </form>
    </Form>
  )
}
