import type { AppRouter } from '@a/api'
import type { TRPCQueryOptions } from '@trpc/tanstack-react-query'

import { appRouter, createTRPCContext } from '@a/api'
import { auth } from '@a/auth'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { headers } from 'next/headers'
import { cache } from 'react'

import { createQueryClient } from './query-client'

const createContext = cache(async () => {
    const heads = new Headers(await headers())
    heads.set('x-trpc-source', 'rsc')
    return createTRPCContext({
      headers: heads,
      session: await auth()
    })
  }),
  getQueryClient = cache(createQueryClient)

export const trpc = createTRPCOptionsProxy<AppRouter>({
  ctx: createContext,
  queryClient: getQueryClient,
  router: appRouter
})

export const HydrateClient = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prefetch = async (queryOptions: ReturnType<TRPCQueryOptions<any>>) => {
  const queryClient = getQueryClient()
  return queryOptions.queryKey[1]?.type === 'infinite'
    ? queryClient.prefetchInfiniteQuery(queryOptions as never)
    : queryClient.prefetchQuery(queryOptions)
}
