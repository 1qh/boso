import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

interface PostType {
  id: number
  title: string
  url: string
}

const INITIAL_POST_ID = 1,
  fetchPost = async (id = INITIAL_POST_ID) =>
    (await (
      await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    ).json()) as PostType,
  postId = atomWithStorage('postId', INITIAL_POST_ID),
  postCache = atom<Record<number, PostType>>({}),
  postData = atom(
    async get => {
      const id = get(postId),
        cache = get(postCache)
      console.log(cache)
      return cache[id] ?? fetchPost(id)
    },
    (_, set, post: PostType) => set(postCache, cache => ({ ...cache, [post.id]: post }))
  )

export { fetchPost, postData, postId }

export type { PostType }
