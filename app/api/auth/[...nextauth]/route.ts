import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    async session({ session, user }) {
      const account = await prisma.user.findUnique({
        where: {
          email: user.email as string
        }
      });
      
      return {
        ...session,
        user: {
          ...session.user,
        },
        account: account
      }
    },
  }
})

export { handler as GET, handler as POST }