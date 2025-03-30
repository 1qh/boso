import type { TRPCRouterRecord } from '@trpc/server'

import { desc, eq } from '@a/db'
import { CreatePostSchema, Post } from '@a/db/schema'
import { z } from 'zod'

import { protectedProcedure, publicProcedure } from '../trpc'

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => ctx.db.query.Post.findMany({ orderBy: desc(Post.createdAt) })),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => ctx.db.query.Post.findFirst({ where: eq(Post.id, input.id) })),

  create: protectedProcedure.input(CreatePostSchema).mutation(({ ctx, input }) => ctx.db.insert(Post).values(input)),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => ctx.db.delete(Post).where(eq(Post.id, input))),

  infinite: publicProcedure
    .input(z.object({ cursor: z.number().nullish(), limit: z.number().min(1) }))
    .query(async ({ ctx, input: { cursor, limit } }) => {
      const offset = cursor ?? 0,
        items = await ctx.db.query.Post.findMany({
          limit,
          offset,
          orderBy: desc(Post.createdAt)
        })
      return {
        items,
        next: items.length === limit ? offset + limit : null
      }
    })
} satisfies TRPCRouterRecord
