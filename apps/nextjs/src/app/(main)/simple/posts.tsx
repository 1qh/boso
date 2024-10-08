'use client'

import { PostCard } from '~/components/post-card'
import { api } from '~/trpc/react'

export default function Posts() {
  const [posts] = api.post.all.useSuspenseQuery()
  if (posts.length === 0) {
    return 'No posts yet'
  }
  return posts.map(p => <PostCard key={p.id} post={p} />)
}
