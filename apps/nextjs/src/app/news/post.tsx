'use client'

import { Suspense } from 'react'
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

import { Button } from '@a/ui/button'

import type { PostType } from './store'
import { postData, postId } from './store'

const PostId = () => {
    const [id, setId] = useAtom(postId),
      next = () => setId(x => x + 1),
      prev = () => setId(x => x - 1 || 1)
    return (
      <>
        <p>id: {id}</p>

        {id > 1 ? <Button onClick={prev}>Prev</Button> : null}

        <Button onClick={next}>Next</Button>
      </>
    )
  },
  PostTitle = () => {
    const [data] = useAtom(postData)
    return (
      <>
        <p>{data.title}</p>

        <a href={data.url}>{data.url}</a>
      </>
    )
  },
  Post = ({ initialPost }: { readonly initialPost: PostType }) => {
    useHydrateAtoms([[postData, initialPost]])
    return (
      <div className='notranslate'>
        <PostId />

        <Suspense fallback='Loading...'>
          <PostTitle />
        </Suspense>
      </div>
    )
  }

export default Post
