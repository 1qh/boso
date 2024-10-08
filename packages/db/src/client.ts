import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import * as schema from './schema'

export const db = drizzle(
  createClient({
    authToken: process.env.TURSO_TOKEN,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.TURSO_URL!
  }),
  { casing: 'snake_case', schema }
)
