import { createClient } from '@libsql/client/web'
import { drizzle } from 'drizzle-orm/libsql'

import * as schema from './schema'

const client = createClient({
    authToken: process.env.TURSO_TOKEN,
    url: process.env.TURSO_URL ?? ''
  }),
  db = drizzle({ casing: 'snake_case', client, schema })

export { db }
