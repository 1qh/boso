import { Suspense } from 'react'

import { HydrateClient, prefetch, trpc } from '~/trpc/server'

import Posts from './posts'

const CardSkeleton = () => (
    <div className='bg-muted flex flex-col gap-2 my-2.5 p-3 rounded-lg w-full'>
      <p className='animate-pulse bg-muted-foreground rounded text-xl w-1/6'>&nbsp;</p>
      <p className='animate-pulse bg-muted-foreground rounded text-sm w-1/3'>&nbsp;</p>
    </div>
  ),
  Page = () => {
    prefetch(trpc.post.all.queryOptions())
    return (
      <HydrateClient>
        <Suspense
          fallback={
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          }>
          <Posts />
        </Suspense>
      </HydrateClient>
    )
  }

export default Page
