/// <reference types="@solidjs/start/env" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_URL: string
    readonly BETTER_AUTH_SECRET: string
    readonly BETTER_AUTH_URL: string
  }
}
