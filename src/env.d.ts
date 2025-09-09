/// <reference types="@solidjs/start/env" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string
    readonly BETTER_AUTH_SECRET: string
    readonly BETTER_AUTH_URL: string

    readonly AUTH_SECRET: string

    readonly MAILER_AWS_ACCESS_KEY_ID: string
    readonly MAILER_AWS_SECRET_ACCESS_KEY: string
    readonly MAILER_AWS_REGION: string
    readonly MAILER_AWS_SES_SOURCE: string

    readonly STRIPE_SECRET_KEY: string
    readonly STRIPE_WEBHOOK_SECRET: string

    readonly GOOGLE_CLIENT_ID: string
    readonly GOOGLE_CLIENT_SECRET: string

    readonly MICROSOFT_CLIENT_ID: string
    readonly MICROSOFT_CLIENT_SECRET: string
  }
}
