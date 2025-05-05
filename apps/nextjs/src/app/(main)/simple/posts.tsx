'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { PostCard } from '~/components/post-card'
import { useTRPC } from '~/trpc/react'

const Posts = () => {
  const { post } = useTRPC(),
    { data: posts } = useSuspenseQuery(post.all.queryOptions())
  if (posts.length === 0) return 'No posts yet'

  return posts.map(p => <PostCard key={p.id} postData={p} />)
}

export default Posts
