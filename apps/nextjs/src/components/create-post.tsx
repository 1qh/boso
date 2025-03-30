'use client'

import { CreatePostSchema } from '@a/db/schema'
import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@a/ui/form'
import { Input } from '@a/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { toast } from 'sonner'

import useForm from '~/hook/use-form'
import { useTRPC } from '~/trpc/react'

export default function CreatePost() {
  const { post } = useTRPC(),
    form = useForm({
      defaultValues: { content: '', title: '' },
      schema: CreatePostSchema
    }),
    queryClient = useQueryClient(),
    { isPending, mutate } = useMutation(
      post.create.mutationOptions({
        onError: err =>
          toast.error(err.data?.code === 'UNAUTHORIZED' ? 'You must be logged in to post' : 'Failed to create post'),
        onSuccess: async () => {
          form.reset()
          await queryClient.invalidateQueries(post.pathFilter())
        }
      })
    )
  return (
    <Form {...form}>
      <form className='flex gap-2.5 mt-3' onSubmit={form.handleSubmit(data => mutate(data))}>
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
            'duration-700 transition-all',
            isPending &&
              '*:stroke-none animate-spin border-2 border-foreground border-t-transparent rounded-3xl text-foreground'
          )}
          size='icon'
          variant='outline'>
          <Send />
        </Button>
      </form>
    </Form>
  )
}
