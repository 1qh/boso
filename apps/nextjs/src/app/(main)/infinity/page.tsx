'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { PostCard } from '~/components/post-card'
import { useTRPC } from '~/trpc/react'

const limit = 10

export default function Page() {
  const { post } = useTRPC(),
    { inView, ref } = useInView(),
    { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
      post.infinite.infiniteQueryOptions({ limit }, { getNextPageParam: p => p.next })
    )

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView, fetchNextPage])

  return (
    <>
      {data?.pages.map(page => page.items.map(p => <PostCard key={p.id} postData={p} />))}
      {isFetchingNextPage ? (
        <p className='animate-spin border-2 border-foreground border-t-transparent mx-auto rounded-full size-8' />
      ) : hasNextPage ? (
        <p className='h-8' ref={ref} />
      ) : null}
    </>
  )
}
