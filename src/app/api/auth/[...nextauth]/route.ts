// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { resend } from '@/lib/resend'
import MagicLinkEmail from '@/emails/magic-link-email'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    /* @ts-ignore */
    {
      id: 'resend',
      type: 'email',
      /* @ts-ignore */
      async sendVerificationRequest({ identifier: email, url }) {
        const { host } = new URL(url)
        try {
          await resend.emails.send({
            from:
              'Log In <magic-link@' + process.env.RESEND_VERIFIED_DOMAIN + '>',
            to: [email],
            subject: `Log in to ${host}`,
            text: `Sign in to ${host}\n${url}\n\n`,
            react: MagicLinkEmail({ url, host })
          })
        } catch (error) {
          throw new Error('Failed to send the verification Email.')
        }
      }
    }
  ],
  session: {
    strategy: 'jwt'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
