import type { Config } from 'drizzle-kit'

if (!process.env.TURSO_URL || !process.env.TURSO_TOKEN) {
  throw new Error('Missing TURSO_URL or TURSO_TOKEN')
}

export default {
  casing: 'snake_case',
  dbCredentials: {
    authToken: process.env.TURSO_TOKEN,
    url: process.env.TURSO_URL
  },
  dialect: 'turso',
  schema: './src/schema.ts'
} satisfies Config
