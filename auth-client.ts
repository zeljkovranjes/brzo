import { createAuthClient } from 'better-auth/solid'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { auth } from './auth'
import { stripeClient } from '@better-auth/stripe/client'

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    stripeClient({
      subscription: true,
    }),
  ],
})
