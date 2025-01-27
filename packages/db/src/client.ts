import { drizzle } from 'drizzle-orm/libsql'

import * as schema from './schema'

export const db = drizzle({
  casing: 'snake_case',
  connection: {
    authToken: process.env.TURSO_TOKEN,
    url: process.env.TURSO_URL ?? ''
  },
  schema
})
