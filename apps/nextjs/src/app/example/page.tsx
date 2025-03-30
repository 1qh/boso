import { Suspense } from 'react'

import { HydrateClient, prefetch, trpc } from '~/trpc/server'

import { AuthShowcase } from './auth-showcase'
import { CreatePostForm, PostCardSkeleton, PostList } from './posts'

const Page = () => {
  prefetch(trpc.post.all.queryOptions())
  return (
    <HydrateClient>
      <main className='container h-screen py-16'>
        <div className='flex flex-col gap-4 items-center justify-center'>
          <AuthShowcase />
          <CreatePostForm />
          <div className='max-w-2xl overflow-y-scroll w-full'>
            <Suspense
              fallback={
                <div className='flex flex-col gap-4 w-full'>
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                  <PostCardSkeleton />
                </div>
              }>
              <PostList />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  )
}

export default Page
