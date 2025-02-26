import type { DefaultSession, NextAuthConfig, Session as NextAuthSession } from 'next-auth'
import { skipCSRFCheck } from '@auth/core'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import Google from 'next-auth/providers/google'

import { db } from '@a/db/client'
import { Account, Session, User } from '@a/db/schema'

import { env } from '../env'

const isSecureContext = env.NODE_ENV !== 'development'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const adapter = DrizzleAdapter(db, {
    accountsTable: Account,
    sessionsTable: Session,
    usersTable: User
  }),
  authConfig = {
    adapter,
    // In development, we need to skip checks to allow Expo to work
    ...(isSecureContext ? {} : { skipCSRFCheck, trustHost: true }),
    callbacks: {
      session: opts => {
        if (!('user' in opts)) {
          throw new Error('unreachable with session strategy')
        }
        return { ...opts.session, user: { ...opts.session.user, id: opts.user.id } }
      }
    },
    providers: [Google],
    secret: env.AUTH_SECRET
  } as NextAuthConfig,
  invalidateSessionToken = async (token: string) => {
    await adapter.deleteSession?.(token.slice('Bearer '.length))
  },
  validateToken = async (token: string): Promise<NextAuthSession | null> => {
    const session = await adapter.getSessionAndUser?.(token.slice('Bearer '.length))
    return session
      ? { expires: session.session.expires.toISOString(), user: { ...session.user } }
      : null
  }

export { authConfig, invalidateSessionToken, isSecureContext, validateToken }
