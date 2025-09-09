/*
   ───────────────────────────────────────────────
   Amazon SES Integration (Mailer)
   ───────────────────────────────────────────────

   https://aws.amazon.com/ses/

   Amazon SES

    Amazon Simple Email Service (Amazon SES) is a cloud-based 
    email service provider that can integrate into any application 
    for high-volume email automation.

    There's no reason not to use Amazon SES, most mailers
    just wrap around Amazon SES's API.
*/

import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import nodemailer from 'nodemailer'

const client = new SESv2Client({
  region: process.env.MAILER_AWS_REGION,
  credentials: {
    accessKeyId: process.env.MAILER_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MAILER_AWS_SECRET_ACCESS_KEY,
  },
})

export const transporter = nodemailer.createTransport({
  // @ts-ignore
  SES: { sesClient: client, SendEmailCommand },
})
