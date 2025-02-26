import type { InferSelectModel } from 'drizzle-orm'
import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

const Post = sqliteTable(
    'post',
    {
      content: text().notNull(),
      createdAt: integer({ mode: 'timestamp' })
        .notNull()
        .default(sql`(unixepoch())`),
      id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
      title: text().notNull(),
      updatedAt: integer({ mode: 'timestamp' }).$onUpdateFn(() => sql`(unixepoch())`)
    },
    _ => []
  ),
  CreatePostSchema = createInsertSchema(Post, {
    content: z.string().min(1).max(256),
    title: z.string().min(1).max(256)
  }).omit({
    createdAt: true,
    id: true,
    updatedAt: true
  }),
  User = sqliteTable(
    'user',
    {
      email: text().notNull(),
      emailVerified: integer({ mode: 'timestamp_ms' }),
      id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
      image: text(),
      name: text()
    },
    _ => []
  ),
  Account = sqliteTable(
    'account',
    {
      access_token: text(),
      expires_at: integer(),
      id_token: text(),
      provider: text().notNull(),
      providerAccountId: text().notNull(),
      refresh_token: text(),
      scope: text(),
      session_state: text(),
      token_type: text(),
      type: text().$type<'email' | 'oauth' | 'oidc' | 'webauthn'>().notNull(),
      userId: text()
        .notNull()
        .references(() => User.id, { onDelete: 'cascade' })
    },
    account => [primaryKey({ columns: [account.provider, account.providerAccountId] })]
  ),
  UserRelations = relations(User, ({ many }) => ({ accounts: many(Account) })),
  AccountRelations = relations(Account, ({ one }) => ({
    user: one(User, { fields: [Account.userId], references: [User.id] })
  })),
  Session = sqliteTable(
    'session',
    {
      expires: integer({ mode: 'timestamp_ms' }).notNull(),
      sessionToken: text().primaryKey(),
      userId: text()
        .notNull()
        .references(() => User.id, { onDelete: 'cascade' })
    },
    _ => []
  ),
  SessionRelations = relations(Session, ({ one }) => ({
    user: one(User, { fields: [Session.userId], references: [User.id] })
  }))

type PostModel = InferSelectModel<typeof Post>

export type { PostModel }

export {
  Account,
  AccountRelations,
  CreatePostSchema,
  Post,
  Session,
  SessionRelations,
  User,
  UserRelations
}
