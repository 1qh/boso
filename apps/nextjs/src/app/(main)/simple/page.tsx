import { Suspense } from 'react'

import { api, HydrateClient } from '~/trpc/server'
import Posts from './posts'

export const runtime = 'edge'

const PostCardSkeleton = () => (
    <div className='my-2.5 flex w-full flex-col gap-2 rounded-lg bg-muted p-3'>
      <p className='w-1/6 animate-pulse rounded bg-muted-foreground text-xl'>&nbsp;</p>

      <p className='w-1/3 animate-pulse rounded bg-muted-foreground text-sm'>&nbsp;</p>
    </div>
  ),
  Page = () => {
    void api.post.all.prefetch()
    return (
      <HydrateClient>
        <Suspense
          fallback={
            <>
              <PostCardSkeleton />

              <PostCardSkeleton />

              <PostCardSkeleton />
            </>
          }>
          <Posts />
        </Suspense>
      </HydrateClient>
    )
  }

export default Page
