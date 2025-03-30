'use client'

import type { RouterOutputs } from '@a/api'

import { cn } from '@a/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format, formatDistance } from 'date-fns'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

import { useTRPC } from '~/trpc/react'

export const PostCard = ({
  postData: { content, createdAt, id, title }
}: {
  readonly postData: RouterOutputs['post']['all'][number]
}) => {
  const { post } = useTRPC(),
    queryClient = useQueryClient(),
    { isPending, mutate } = useMutation(
      post.delete.mutationOptions({
        onError: err =>
          toast.error(
            err.data?.code === 'UNAUTHORIZED' ? 'You must be logged in to delete a post' : 'Failed to delete post'
          ),
        onSuccess: async () => queryClient.invalidateQueries(post.pathFilter())
      })
    )
  return (
    <div className='bg-muted flex group items-center my-2.5 p-3 rounded-lg w-full'>
      <div className='group grow space-y-1'>
        <p className='font-semibold text-2xl'>{title}</p>
        <p className='group-hover:hidden text-xs'>{format(createdAt, 'd/L/y')}</p>
        <p className='group-hover:block hidden text-xs'>{formatDistance(createdAt, new Date(), { addSuffix: true })}</p>
        <p>{content}</p>
      </div>
      <Trash
        className={cn(
          'absolute active:scale-75 cursor-pointer duration-500 group-hover:size-16 hover:scale-110 px-3 right-8 rounded-lg size-0 stroke-1 text-muted-foreground transition-all',
          isPending
            ? 'animate-spin border border-foreground border-t-transparent rounded-[100px] size-16 text-transparent'
            : 'hover:bg-destructive/20 hover:text-destructive'
        )}
        onClick={() => mutate(id)}
      />
    </div>
  )
}
