import prisma from "@/lib/prisma/prisma";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  }
}


const userSchema = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
});

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: { email: parsedCredentials.email },
        });

        if (!user) {
          throw new Error("Utilisateur introuvable");
        }

        const isPasswordValid = await bcrypt.compare(
          parsedCredentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        const userData = userSchema.parse({
          id: user.id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });

        return userData;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.firstName = user.firstName as string;
        token.lastName = user.lastName as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
        };
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };
