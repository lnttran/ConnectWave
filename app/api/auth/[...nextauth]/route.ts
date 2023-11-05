import prisma from "@/lib/singleton/prisma";
import NextAuth from "next-auth/next";
import { authOptions } from "@/app/config/authOption";

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    async session({ session, user }) {
      const account = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
      });

      return {
        ...session,
        user: {
          ...session.user,
        },
        account: account,
      };
    },
  },
});

export { handler as GET, handler as POST };
