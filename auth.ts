import { betterAuth } from 'better-auth'
import { Database } from 'bun:sqlite'

// Kysely, setup.
const database = new Database(process.env.DATABASE_URL)

// Better-Auth, setup.
export const auth = betterAuth({
  database,
})
