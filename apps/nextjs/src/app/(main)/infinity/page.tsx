'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { PostCard } from '~/components/post-card'
import { api } from '~/trpc/react'

const limit = 10

export default function Page() {
  const { inView, ref } = useInView(),
    { data, fetchNextPage, hasNextPage, isFetchingNextPage } = api.post.infinite.useInfiniteQuery(
      { limit },
      { getNextPageParam: p => p.next }
    )

  useEffect(() => {
    if (inView) {
      void fetchNextPage()
    }
  }, [inView, fetchNextPage])

  return (
    <>
      {data?.pages.map(page => page.items.map(post => <PostCard key={post.id} post={post} />))}

      {isFetchingNextPage ? (
        <p className='mx-auto size-8 animate-spin rounded-full border-2 border-foreground border-t-transparent' />
      ) : hasNextPage ? (
        <p className='h-8' ref={ref} />
      ) : null}
    </>
  )
}
