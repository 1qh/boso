import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'

import type { AppRouter } from '@a/api'

import { getBaseUrl } from './base-url'
import { getToken } from './session-store'

/**
 * A set of typesafe hooks for consuming your API.
 */
const api = createTRPCReact<AppRouter>(),
  /**
   * A wrapper for your app that provides the TRPC context.
   * Use only in _app.tsx
   */
  TRPCProvider = ({ children }: { readonly children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient()),
      [trpcClient] = useState(() =>
        api.createClient({
          links: [
            loggerLink({
              colorMode: 'ansi',
              enabled: opts =>
                process.env.NODE_ENV === 'development' ||
                (opts.direction === 'down' && opts.result instanceof Error)
            }),
            httpBatchLink({
              headers() {
                const headers = new Map<string, string>()
                headers.set('x-trpc-source', 'expo-react')

                const token = getToken()
                if (token) {
                  headers.set('Authorization', `Bearer ${token}`)
                }

                return Object.fromEntries(headers)
              },
              transformer: superjson,
              url: `${getBaseUrl()}/api/trpc`
            })
          ]
        })
      )

    return (
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </api.Provider>
    )
  }

export { type RouterInputs, type RouterOutputs } from '@a/api'

export { api, TRPCProvider }
