import { stripe } from '@better-auth/stripe'
import { betterAuth } from 'better-auth'
import { emailHarmony } from 'better-auth-harmony'
import { Database } from 'bun:sqlite'
import { Stripe } from 'stripe'
import { transporter } from '~/libs/mailer'

// Kysely, setup.
const database = new Database(process.env.DATABASE_URL)

// Stripe, setup.
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

// Better-Auth, setup.
export const auth = betterAuth({
  /////////////////////
  // Plugins

  plugins: [
    // more information on stripe: https://www.better-auth.com/docs/plugins/stripe
    emailHarmony(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      getCheckoutSessionParams: async ({}) => {
        return {
          params: {
            tax_id_collection: {
              enabled: true,
            },
            automatic_tax: {
              enabled: true,
            },
          },
        }
      },
      subscriptions: {
        enabled: true,
        requireEmailVerification: true,
        // dynamically get all plans from stripe
        plans: async () => {
          // stripe prices api
          const prices = await stripeClient.prices.list({
            active: true,
            expand: ['data.product'],
          })
          const plans = prices
          // returns EVERYTHIGN you can always map plans and return the data you want.
          return plans.data
        },
      },
    }),
  ],

  /////////////////////
  // Database

  database,

  /////////////////////
  // App Name

  appName: 'brzo',

  /////////////////////
  // Account

  account: {
    encryptOAuthTokens: true,
    updateAccountOnSignIn: true,
    useSecureCookies: process.env.NODE_ENV === 'production',
    accountLinking: {
      enabled: false,
      trustedProviders: ['google', 'microsoft', 'email-password'],
      allowDifferentEmails: false,
    },
    defaultCookieAttributes: {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    },
  },

  /////////////////////
  // Advanced

  advanced: {
    ipAddress: {
      ipAddressHeaders: ['x-client-ip', 'x-forwarded-for', 'CF-Connecting-IP'],
      disableIpTracking: false,
    },
    cookiePrefix: 'ms',
    cookies: {
      session_token: { name: 'auth_token' },
      session_data: { name: 'auth_context' },
    },
  },

  /////////////////////
  // Session

  session: {
    cookieCache: {
      enabled: true,
    },
    additionalFields: {
      accountType: {
        type: 'string',
        input: false,
      },
    },
  },

  /////////////////////
  // Logger

  logger: {
    disabled: true,
    level: 'warn',
    log: (level, message, ...args) => {
      console.log(`[${level}] ${message}`, ...args)
    },
  },

  /////////////////////
  // Telemetry

  telemetry: {
    enabled: false,
  },

  /////////////////////
  // Disabled Paths

  disabledPaths: [],

  /////////////////////
  // Social Providers

  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: 'common',
      prompt: 'select_account',
    },
  },

  /////////////////////
  // Email And Password

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      try {
        await transporter.sendMail({
          from: process.env.MAILER_AWS_SES_SOURCE,
          to: user.email,
          subject: 'Reset Your Password',
          text: `Hello ${user.name || ''},

            You requested to reset your password. Please click the link below to proceed:

${url}`,
        })
      } catch (err) {
        console.error('Error sending password reset email:', err)
      }
    },
    onPasswordReset: async ({ user }, request) => {
      try {
        await transporter.sendMail({
          from: process.env.MAILER_AWS_SES_SOURCE,
          to: user.email,
          subject: 'Your Password Was Changed',
          text: `Hello ${user.name || ''},

            This is a confirmation that your password was successfully changed.

            If you did not perform this change, please contact support immediately.`,
        })
      } catch (err) {
        console.error('Error sending password change confirmation email:', err)
      }
    },
  },

  /////////////////////
  // Email Verification

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await transporter.sendMail({
          from: process.env.MAILER_AWS_SES_SOURCE,
          to: user.email,
          subject: 'Verify Your Email Address',
          text: `Hello ${user.name || ''},
    
              Please verify your email address by clicking the link below:
    
              ${url}`,
        })
      } catch (err) {
        console.error('Error sending verification email:', err)
      }
    },
  },
})
