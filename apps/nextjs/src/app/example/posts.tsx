'use client'

import type { RouterOutputs } from '@a/api'

import { CreatePostSchema } from '@a/db/schema'
import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@a/ui/form'
import { Input } from '@a/ui/input'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import useForm from '~/hook/use-form'
import { useTRPC } from '~/trpc/react'

export const CreatePostForm = () => {
  const trpc = useTRPC(),
    form = useForm({
      defaultValues: {
        content: '',
        title: ''
      },
      schema: CreatePostSchema
    }),
    queryClient = useQueryClient(),
    createPost = useMutation(
      trpc.post.create.mutationOptions({
        onError: err => {
          toast.error(err.data?.code === 'UNAUTHORIZED' ? 'You must be logged in to post' : 'Failed to create post')
        },
        onSuccess: async () => {
          form.reset()
          await queryClient.invalidateQueries(trpc.post.pathFilter())
        }
      })
    )

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4 max-w-2xl w-full'
        onSubmit={form.handleSubmit(data => {
          createPost.mutate(data)
        })}>
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
        <Button>Create</Button>
      </form>
    </Form>
  )
}

export const PostCardSkeleton = (props: { pulse?: boolean }) => {
  const { pulse = true } = props
  return (
    <div className='bg-muted flex flex-row p-4 rounded-lg'>
      <div className='flex-grow'>
        <h2 className={cn('bg-primary font-bold rounded text-2xl w-1/4', pulse && 'animate-pulse')}>&nbsp;</h2>
        <p className={cn('bg-current mt-2 rounded text-sm w-1/3', pulse && 'animate-pulse')}>&nbsp;</p>
      </div>
    </div>
  )
}

export const PostCard = ({
  post: { content, id, title }
}: {
  post: RouterOutputs['post']['all'][number]
}) => {
  const trpc = useTRPC(),
    queryClient = useQueryClient(),
    deletePost = useMutation(
      trpc.post.delete.mutationOptions({
        onError: err => {
          toast.error(
            err.data?.code === 'UNAUTHORIZED' ? 'You must be logged in to delete a post' : 'Failed to delete post'
          )
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries(trpc.post.pathFilter())
        }
      })
    )

  return (
    <div className='bg-muted flex flex-row p-4 rounded-lg'>
      <div className='flex-grow'>
        <h2 className='font-bold text-2xl text-primary'>{title}</h2>
        <p className='mt-2 text-sm'>{content}</p>
      </div>
      <div>
        <Button
          className='cursor-pointer font-bold hover:bg-transparent hover:text-white text-primary text-sm uppercase'
          onClick={() => deletePost.mutate(id)}
          variant='ghost'>
          Delete
        </Button>
      </div>
    </div>
  )
}

export const PostList = () => {
  const trpc = useTRPC(),
    { data: posts } = useSuspenseQuery(trpc.post.all.queryOptions())

  if (posts.length === 0)
    return (
      <div className='flex flex-col gap-4 relative w-full'>
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <div className='absolute bg-black/10 flex flex-col inset-0 items-center justify-center'>
          <p className='font-bold text-2xl text-white'>No posts yet</p>
        </div>
      </div>
    )

  return (
    <div className='flex flex-col gap-4 w-full'>
      {posts.map(p => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  )
}
